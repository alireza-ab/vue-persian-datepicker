import Date from '@alireza-ab/persian-date'

const Core = {
    mergeObject: function (original, changed) {
        for (const key in changed) {
            if (original[key] && Object.prototype.toString.call(changed[key]) === '[object Object]')
                this.mergeObject(original[key], changed[key])
            else original[key] = changed[key];
        }
    }
}

export { Date, Core }