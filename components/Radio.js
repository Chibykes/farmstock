import { useEffect, useState } from "react"



export default function Radio({ options, ...props }) {

    return(
        <div className="flex flex-wrap gap-5">

            {options.map(opt => (
                <div 
                    className="flex justify-start items-center gap-2"
                    onClick={() => props?.onChange?.({
                                target: {
                                    name: props.name,
                                    value: opt
                                }
                            })}
                    key={opt} 
                >
                    <div className={`w-5 h-5 grid place-content-center rounded-full border-2
                        ${props.value !== opt ? 'border-neutral-600': 'border-lime-600'}
                    `}
                    >
                        {props.value === opt && <div className="bg-lime-600 w-2 h-2 rounded-full"></div>}
                    </div>

                    <p className="text-sm capitalize">{opt}</p>
                </div>
            ))}


        </div>
    )

}