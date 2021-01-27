import PersianDate from '@alireza-ab/persian-date'

const Core = {
    mergeObject: function (original, changed) {
        for (const key in changed) {
            if (original[key] && Object.prototype.toString.call(changed[key]) === '[object Object]')
                this.mergeObject(original[key], changed[key])
            else original[key] = changed[key];
        }
    },
    setStyles: function (styles, root) {
        for (const name in styles) {
            root.style.setProperty("--" + name, styles[name]);
        }
    },
    setColor: function (color, root) {
        if (!color)
            return;
        let colors = {}
        switch (color) {
            case 'red':
                colors = {
                    'primary-color': '#c7004c',
                    'secondary-color': '#ffaaaa',
                    'in-range-background-color': '#ffd2d2',
                }
                break;
            case 'pink':
                colors = {
                    'primary-color': '#e56ab3',
                    'secondary-color': '#ef87be',
                    'in-range-background-color': '#fcbcd7',
                }
                break;
            case 'orange':
                colors = {
                    'primary-color': '#ffa500',
                    'secondary-color': '#ffbe47',
                    'in-range-background-color': '#ffe0a6',
                }
                break;
            case 'green':
                colors = {
                    'primary-color': '#38a169',
                    'secondary-color': '#89dda3',
                    'in-range-background-color': '#c6f6d5',
                }
                break;
            case 'purple':
                colors = {
                    'primary-color': '#7825d0',
                    'secondary-color': '#c196ed',
                    'in-range-background-color': '#d4baf3',
                }
                break;
            case 'gray':
                colors = {
                    'primary-color': '#494848',
                    'secondary-color': '#909090',
                    'in-range-background-color': '#b4b4b4',
                }
                break;
            default:
                break;
        }
        this.setStyles(colors, root)
    }
}

export { PersianDate, Core }