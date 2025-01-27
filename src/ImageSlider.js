import React, { useState, useEffect } from 'react';

const ImageSlider = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAutoplaying, setIsAutoplaying] = useState(false);

    const images = [
        "/img/1.jpg",
        "/img/2.jpg",
        "/img/3.jpg",
        "/img/4.jpg",
        "/img/5.jpg"
    ];

    useEffect(() => {
        let intervalID;
        if (isAutoplaying) {
            intervalID = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 1000);
        }
        return () => clearInterval(intervalID);
    }, [isAutoplaying, images.length]);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const toggleAutoplay = () => {
        setIsAutoplaying((prev) => !prev);
    };

    return (
        <div className="container">
            <img id="image" src={images[currentImageIndex]} alt={`Immagine ${currentImageIndex + 1}`} />
            <div id="counter">{currentImageIndex + 1} / {images.length}</div>
            <div className="buttons">
                <button id="next" onClick={nextImage}>Prossima</button>
                <button id="startStop" onClick={toggleAutoplay}>
                    {isAutoplaying ? "Stop" : "Start"}
                </button>
            </div>
        </div>
    );
};

export default ImageSlider;
