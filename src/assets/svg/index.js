import { SvgXml } from 'react-native-svg';


function BackButton({ width = "49", height = "49", color = "white", opacity = "0.1" }) {
    const svgXml = `<svg width=${width || '49'} height=${height || '49'
        } viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect opacity= ${opacity || '0.1'
        } y="0.0609741" width="48" height="48" rx="16" transform="rotate(-0.072764 0 0.0609741)" fill=${color || 'white'
        }/>
  <path d="M21.8151 29.0608L16.7143 24.0608L21.8151 19.0608M31 24.0608L16.8571 24.0608" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
    return <SvgXml xml={svgXml} />
}

function Profile({ width = "49", height = "49", color = "white" }) {
    const svgXml = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width=${width || '49'} height=${height || '49'
        } viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="1" d="M12.1207 12.78C12.0507 12.77 11.9607 12.77 11.8807 12.78C10.1207 12.72 8.7207 11.28 8.7207 9.50998C8.7207 7.69998 10.1807 6.22998 12.0007 6.22998C13.8107 6.22998 15.2807 7.69998 15.2807 9.50998C15.2707 11.28 13.8807 12.72 12.1207 12.78Z" stroke=${color || '#292D32'} stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/>
<path opacity="1" d="M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z" stroke=${color || '#292D32'} stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke=${color || '#292D32'} stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    return <SvgXml xml={svgXml} />
}

export { BackButton, Profile }