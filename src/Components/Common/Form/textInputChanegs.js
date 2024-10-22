

const TextInputChanges = ({ input, placeholder, type, className, setValues, values, row, sectionTitleIndex, fieldNameIndex, isArray, sections }) => {
    const handleChange = (e) => {
        let { value, name } = e.target;
        let arrayOfObject = []
        let aarr = []

        if (isArray === "isArray") {
            for (const [key, value] of Object.entries(sections[sectionTitleIndex].inputs[fieldNameIndex])) {
                console.log("value, name====>", [name] = e.target.value, `${key}: ${value}`);
            }
            console.log("value, name===gf=>", name, aarr, input, value, name);
            console.log("heeeee", sectionTitleIndex, fieldNameIndex, { ...values, [name]: value });
            //values["arrayOfObject"].push({})
            setValues({ ...values, [name]: value })
        } else {
            console.log("heeeee", sectionTitleIndex, fieldNameIndex, { ...values, [name]: value });
            setValues({ ...values, [name]: value })
        }
    }

    return (
        <>
            {input?.type === 'textarea' ? <textarea
                value={values[input?.value]} rows={row} onChange={handleChange} className={className} placeholder={placeholder} name={input?.value} type={type} />
                : <input
                    value={values[input?.value]} minLength={input?.min || 0} maxLength={input?.maxLength}
                    onChange={(e) => {
                        if (type === 'number') {
                            if (/^[0-9]*$/.test(e.target.value)) {
                                handleChange(e)
                            }
                        } else {
                            handleChange(e)
                        }

                    }}
                    className={className} placeholder={placeholder} name={input?.value} />}
        </>
    )
}

export default TextInputChanges;