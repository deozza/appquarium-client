export default class Theme{
    public static TEXT_COLORS(): object {
        return {
            black: 'text-black',
            white: 'text-white',
            primary: 'text-blue-800',
            secondary: 'text-violet-800',
            success: 'text-green-500',
            warning: 'text-yellow-400',
            danger: 'text-red-600',
            info: 'text-cyan-400',
        }
    }

    public static HEADER_SIZES(): object {
        return {
            h1: 'h1',
            h2: 'h2',
            h3: 'h3',
            h4: 'h4',
            h5: 'h5',
            h6: 'h6'
        }
    }

    public static TEXT_DISPLAY_SIZES(): object {
        return {
            xxxl: 'text-3xl',
            xxl: 'text-2xl',
            xl: 'text-xl',
            lg: 'text-lg',
            base: 'text-base',
            sm: 'text-sm'
        }
    }

    public static ELEMENT_SIZES(): object {
        return {
            small: 'small',
            normal: 'normal',
            large: 'large'
        }
    }

    public static ELEMENT_STYLE(): object {
        return {
            black: 'black',
            white: 'white',
            primary: 'primary',
            secondary: 'secondary',
            success: 'success',
            warning: 'warning',
            danger: 'danger',
            info: 'info',
        }
    }
}