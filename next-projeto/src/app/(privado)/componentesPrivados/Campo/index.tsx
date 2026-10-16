interface CampoProps{
    label: string;
    name: string;
    value: string; 
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    required?: boolean;
}

export function Campo({label, name, value, onChange, type="text", required=false}: CampoProps){
    return(
        <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required} />
        </label>
    )
} 