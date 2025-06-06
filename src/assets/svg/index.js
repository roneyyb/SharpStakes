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

export { BackButton };