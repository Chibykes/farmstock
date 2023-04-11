


export default function Input({ ...props }) {

    return(
        <div className="border-2 border-black bg-white rounded-full overflow-hidden">
            <input 
                className="px-4 py-3 outline-none border-none w-full"
                {...props}
            />
        </div>
    )

}