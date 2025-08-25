// mobile menu toggle (robust init after DOM ready)
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menu-button')
  const mobileMenu = document.getElementById('mobile-menu')
  const mobileOverlay = document.getElementById('mobile-overlay')

  if (!menuButton || !mobileMenu) return

  let isOpen = false

  const openMenu = () => {
    mobileMenu.classList.remove('hidden')
    requestAnimationFrame(() => {
      mobileMenu.classList.remove('opacity-0', '-translate-y-2', 'pointer-events-none')
      if (mobileOverlay) {
        mobileOverlay.classList.remove('hidden')
        requestAnimationFrame(() => {
          mobileOverlay.classList.remove('opacity-0')
        })
      }
    })
  }

  const closeMenu = () => {
    mobileMenu.classList.add('opacity-0', '-translate-y-2', 'pointer-events-none')
    const onEnd = () => {
      mobileMenu.classList.add('hidden')
      mobileMenu.removeEventListener('transitionend', onEnd)
    }
    mobileMenu.addEventListener('transitionend', onEnd)
    if (mobileOverlay) {
      mobileOverlay.classList.add('opacity-0')
      const onFade = () => {
        mobileOverlay.classList.add('hidden')
        mobileOverlay.removeEventListener('transitionend', onFade)
      }
      mobileOverlay.addEventListener('transitionend', onFade)
    }
  }

  menuButton.addEventListener('click', (event) => {
    event.preventDefault()
    isOpen = !isOpen
    if (isOpen) {
      openMenu()
    } else {
      closeMenu()
    }
    menuButton.setAttribute('aria-expanded', String(isOpen))
  })

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => {
      if (!isOpen) return
      isOpen = false
      closeMenu()
      menuButton.setAttribute('aria-expanded', 'false')
    })
  }
})