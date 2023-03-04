import React, { useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/black-and-white.css'

// APIs
import { APIs } from '../../APIs/APIs'

// Hooks
import { useShowHide } from '../../hooks/useShowHide'

// Context
import { useMovieContext } from '../../context/context'

// Rect Icons
import {
  IoChevronBackCircleOutline,
  IoChevronForwardCircleOutline
} from 'react-icons/io5'

const ImageViewer = () => {
  const {
    backdrops,
    backdropIndex,
    setBackdropIndex,
    viewerRef,
    innerViewerRef,
    mode
  } = useMovieContext()
  const { hideViewer } = useShowHide()

  // Detect outside click of Side Menu
  useEffect(() => {
    const handleOutsideClick = e => {
      if (
        viewerRef.current.contains(e.target) &&
        !innerViewerRef.current.contains(e.target)
      ) {
        hideViewer(innerViewerRef, viewerRef)
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => document.removeEventListener('click', handleOutsideClick)
  }, [viewerRef, innerViewerRef, hideViewer])

  const previousImage = () => {
    backdropIndex < 1
      ? setBackdropIndex(backdrops.length - 1)
      : setBackdropIndex(prevIndex => prevIndex - 1)
  }

  const nextImage = () => {
    backdropIndex === backdrops.length - 1
      ? setBackdropIndex(0)
      : setBackdropIndex(prevIndex => prevIndex + 1)
  }

  return (
    <div
      ref={viewerRef}
      className={'viewer ' + (mode === true ? 'lightAlpha1' : 'darkAlpha1')}
    >
      <div ref={innerViewerRef} className='viewer__inner'>
        {backdrops && backdrops.length > 0 && (
          <span className='viewer__inner--length'>
            {backdropIndex + 1} / {backdrops.length}
          </span>
        )}

        {backdrops && backdrops[backdropIndex] && (
          <>
            <img
              className='img-1'
              src={
                backdrops[backdropIndex].file_path !== null
                  ? APIs.img_path + backdrops[backdropIndex].file_path
                  : APIs.no_image_url
              }
              alt='image'
            />

            <img
              className='img-2'
              src={
                backdrops[backdropIndex].file_path !== null
                  ? APIs.img_path_w780 + backdrops[backdropIndex].file_path
                  : APIs.no_image_url
              }
              alt='image'
            />

            <img
              className='img-3'
              src={
                backdrops[backdropIndex].file_path !== null
                  ? APIs.img_path_w780 + backdrops[backdropIndex].file_path
                  : APIs.no_image_url
              }
              alt='image'
            />
          </>

          // <LazyLoadImage
          //   width={'100%'}
          //   height={'100%'}
          //   className='img'
          //   alt='image'
          //   effect='black-and-white'
          //   placeholderSrc={
          //     backdrops[backdropIndex].file_path.file_path === null
          //       ? APIs.no_image_url
          //       : APIs.img_path_original + backdrops[backdropIndex].file_path
          //   }
          //   src={
          //     backdrops[backdropIndex].file_path === null
          //       ? APIs.no_image_url
          //       : APIs.img_path_original + backdrops[backdropIndex].file_path
          //   }
          // />
        )}

        {backdrops && backdrops.length > 1 ? (
          <div className='viewer__inner__buttons'>
            <IoChevronBackCircleOutline
              cursor={'pointer'}
              size={'35px'}
              style={{
                marginLeft: '1rem',
                color: '#fff',
                background: 'rgba(0,0,0,0.5)',
                borderRadius: '50%'
              }}
              onClick={previousImage}
            />
            <IoChevronForwardCircleOutline
              cursor={'pointer'}
              size={'35px'}
              style={{
                marginRight: '1rem',
                color: '#fff',
                background: 'rgba(0,0,0,0.5)',
                borderRadius: '50%'
              }}
              onClick={nextImage}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default ImageViewer
