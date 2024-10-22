const ToolTip = ({ children, title }) => {
    return (
        <div className="group relative flex flex-col items-end ">
            {children}
            <div className="z-50 mt-1 min-h-[1.8rem]  py-1 px-4 right-0 shadow-xl min-w-max  absolute bottom-10 scale-0 rounded bg-white border p-2 text-xs text-primary group-hover:scale-100">
                <svg className="absolute text-white h-3 right-0 mr-3 -bottom-3" x="0px" y="0px" viewBox="0 0 255 255" space="preserve"><polygon className="fill-current" points="0,0 127.5,127.5 255,0" /></svg>
                <span>{title}</span>
            </div>
        </div>
    )
}

export default ToolTip;