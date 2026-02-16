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

        const render = () => {
            const idx = Math.min(
                manifest.frames.length - 1,
                Math.max(0, Math.round(frameIndex.get()))
            );

            const img = images[idx];
            if (img) {
                // Use physical pixels for drawing
                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;
                const canvasRatio = canvasWidth / canvasHeight;
                const imgRatio = img.width / img.height;

                let drawWidth = canvasWidth;
                let drawHeight = canvasHeight;
                let offsetX = 0;
                let offsetY = 0;

                if (canvasRatio > imgRatio) {
                    drawHeight = canvasWidth / imgRatio;
                    offsetY = (canvasHeight - drawHeight) / 2;
                } else {
                    drawWidth = canvasHeight * imgRatio;
                    offsetX = (canvasWidth - drawWidth) / 2;
                }

                if (canvasRatio > imgRatio) {
                    drawHeight = canvasWidth / imgRatio;
                    offsetY = (canvasHeight - drawHeight) / 2;
                } else {
                    drawWidth = canvasHeight * imgRatio;
                    offsetX = (canvasWidth - drawWidth) / 2;
                }

                // Apply 1.1x zoom to allow for cropping
                // And align closer to the TOP to crop the BOTTOM more heavily.
                const scale = 1.1;
                const scaledWidth = drawWidth * scale;
                const scaledHeight = drawHeight * scale;

                // Alignment factor: 0.5 = Center, 0.0 = Top/Left, 1.0 = Bottom/Right
                // We want to keep the top visible and cut the bottom.
                // So we use a factor small than 0.5 for Y.
                const alignY = 0.2;
                // We keep X centered (0.5)
                const alignX = 0.5;

                const scaledOffsetX = offsetX + (drawWidth - scaledWidth) * alignX;
                const scaledOffsetY = offsetY + (drawHeight - scaledHeight) * alignY;

                // Turn off image smoothing for pixel-perfect rendering if desired, 
                // but usually for photos we want smoothing. 
                // However, making sure we draw at high res is key.
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';

                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                ctx.drawImage(img, scaledOffsetX, scaledOffsetY, scaledWidth, scaledHeight);
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
                const dpr = window.devicePixelRatio || 1;

                // Set physical dimensions to match device pixels
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;

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
