'use client'
import React, { useState } from 'react'
import ProductImage from './ProductImage'
import ReactImageZoom from 'react-image-zoom';

export default function ProductImages(){

    const productImagesSources = ['g1.jpg', 'g2.jpg', 'g3.jpg', 'g4.jpg']
    const [selectedProductImage, setSelectedProductImage] = useState(0)
    const [highlightedImageBorderPos, setHighlightedImageBorderPos] = useState(0)

    
    const props = {width: 400, height: 250, zoomWidth: 500, img: productImagesSources[selectedProductImage]};

    const handleClick = (i)=>{
        setSelectedProductImage(i)
        let imageBlockHeight = 100
        let imageBlockDistance = 8
        let imageBlockBorderSpace = 1

        let selectedImageDistance = i*(imageBlockHeight+imageBlockDistance+imageBlockBorderSpace)
        setHighlightedImageBorderPos(selectedImageDistance) 
    }

    return(
        <div className="flex gap-4 basis-full">
            <div className="hidden md:flex flex-col gap-2 relative">
                {productImagesSources.map((src,i)=> (
                    <ProductImage
                        src={src}
                        index={i}
                        key={i}
                        handleClick={handleClick}
                    />
                ))}
                <div 
                    className="duration-500 absolute w-[102px] h-[102px] border-2 border-[#8c8c8c]" 
                    style={{transform: `translate3d(0px, ${highlightedImageBorderPos}px, 0px)`}}>
                </div>
            </div>

            <ProductImage
                src={productImagesSources[selectedProductImage]}
                width={'340'}
                height={'440'}   
            />

            <ReactImageZoom {...props} />
        </div>
    )
}   
