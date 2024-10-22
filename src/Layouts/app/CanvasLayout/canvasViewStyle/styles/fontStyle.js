


import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const fontStyles = [
    { font_style: 'Normal', weight: 300, italic: false },
    { font_style: 'Thin', weight: 100, italic: false },
    { font_style: 'Thin Italic', weight: 100, italic: true },
    { font_style: 'Extra-Light', weight: 200, italic: false },
    { font_style: 'Extra-Light Italic', weight: 200, italic: true },
    { font_style: 'Light', weight: 300, italic: false },
    { font_style: 'Light Italic', weight: 300, italic: true },
    { font_style: 'Regular', weight: 400, italic: false },
    { font_style: 'Regular Italic', weight: 400, italic: true },
    { font_style: 'Medium', weight: 500, italic: false },
    { font_style: 'Medium Italic', weight: 500, italic: true },
    { font_style: 'Semi-Bold', weight: 600, italic: false },
    { font_style: 'Semi-Bold Italic', weight: 600, italic: true },
    { font_style: 'Bold', weight: 700, italic: false },
    { font_style: 'Bold Italic', weight: 700, italic: true },
    { font_style: 'Extra-Bold', weight: 800, italic: false },
    { font_style: 'Extra-Bold Italic', weight: 800, italic: true },
    { font_style: 'Black', weight: 900, italic: false },
    { font_style: 'Black Italic', weight: 900, italic: true },
];

const FontStyles = ({ styles = null, handleFontStyle }) => {
    return (
        <Menu as="div" className="relative">
            <div>
                <Menu.Button className={`px-2 border border-primary flex justify-start rounded-md items-center mx-1 focus:ring-0 focus:outline-none p-1 text-primary`}>
                    <div className="flex justify-start items-center">
                        <span
                        className="text-sm"
                            style={{ fontWeight: styles?.weight, fontStyle: styles?.italic ? 'italic' : 'normal' }}

                        >
                            {styles?.font_style}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                        </svg>
                    </div>
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="z-50 absolute left-0 mt-2  min-w-[200px] h-[302px] overflow-scroll origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-0 py-1 ">
                        {
                            fontStyles?.map((style) => {
                                return (
                                    <Menu.Item key={style?.font_style}>
                                        {({ active }) => (
                                            <button
                                                onClick={() => handleFontStyle(style)}
                                                style={{ fontWeight: style?.weight, fontStyle: style?.italic ? 'italic' : 'normal' }}
                                                className={`border-b ${(styles?.weight === style?.weight && styles?.italic === style?.italic) ? "text-white bg-primary" : "text-gray-500"
                                                    } group flex w-full items-center px-2 py-1.5 text-sm`}
                                            >
                                                {style?.font_style}
                                            </button>
                                        )}
                                    </Menu.Item>
                                )
                            })
                        }
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default FontStyles;
