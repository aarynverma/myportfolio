"use client";

import { useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import manifest from "@/app/sequence-manifest.json";

const ScrollyCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, manifest.frames.length - 1]);

    useEffect(() => {
        const loadImages = async () => {
            const imgs: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            manifest.frames.forEach((filename) => {
                const img = new Image();
                img.src = `/sequence/${filename}`;
                promises.push(
                    new Promise((resolve) => {
                        img.onload = () => resolve();
                        img.onerror = () => resolve();
                    })
                );
                imgs.push(img);
            });

            await Promise.all(promises);
            setImages(imgs);
            setLoaded(true);
        };

        loadImages();
    }, []);

    useEffect(() => {
        if (!loaded || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { alpha: false }); // Optimize for no transparency
        if (!ctx) return;

        let lastIdx = -1;
        let lastWidth = 0;
        let lastHeight = 0;

        const render = () => {
            const idx = Math.min(
                manifest.frames.length - 1,
                Math.max(0, Math.round(frameIndex.get()))
            );

            // Use physical pixels for drawing
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            if (idx === lastIdx && canvasWidth === lastWidth && canvasHeight === lastHeight) {
                requestAnimationFrame(render);
                return;
            }

            lastIdx = idx;
            lastWidth = canvasWidth;
            lastHeight = canvasHeight;

            const img = images[idx];
            if (img) {
                const canvasRatio = canvasWidth / canvasHeight;
                const imgRatio = img.width / img.height;

                let drawWidth = canvasWidth;
                let drawHeight = canvasHeight;
                let offsetX = 0;
                let offsetY = 0;

                if (canvasRatio > imgRatio) {
                    drawHeight = canvasWidth / imgRatio;
                    // Align closer to top instead of absolute center (0.2 instead of 0.5) to naturally crop bottom
                    offsetY = (canvasHeight - drawHeight) * 0.2;
                } else {
                    drawWidth = canvasHeight * imgRatio;
                    offsetX = (canvasWidth - drawWidth) / 2;
                }

                // Removed 1.1x scaling which was stretching low-res images unnecessarily resulting in blur
                const scaledWidth = drawWidth;
                const scaledHeight = drawHeight;
                const scaledOffsetX = offsetX;
                const scaledOffsetY = offsetY;

                // Turn off image smoothing for pixel-perfect rendering if desired, 
                // but usually for photos we want smoothing. 
                // However, making sure we draw at high res is key.
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'low';

                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                
                // Use Math.round to prevent subpixel antialiasing which causes blurriness on canvas
                ctx.drawImage(
                    img,
                    Math.round(scaledOffsetX),
                    Math.round(scaledOffsetY),
                    Math.round(scaledWidth),
                    Math.round(scaledHeight)
                );
            }

            requestAnimationFrame(render);
        };

        const requestId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(requestId);
    }, [loaded, frameIndex, images]);

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                // Handle High-DPI displays completely
                // Clamp DPR to max 2 to prevent massive canvases on modern phones/Macs which kills performance
                const dpr = Math.min(window.devicePixelRatio || 1, 2);

                // Set physical dimensions to match device pixels
                canvasRef.current.width = Math.round(window.innerWidth * dpr);
                canvasRef.current.height = Math.round(window.innerHeight * dpr);

                // Enforce logical dimensions via CSS
                canvasRef.current.style.width = `${window.innerWidth}px`;
                canvasRef.current.style.height = `${window.innerHeight}px`;
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize(); // Init safely

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div ref={containerRef} className="h-[500vh] relative bg-[#121212]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="block w-full h-full" />
            </div>
        </div>
    );
};

export default ScrollyCanvas;
