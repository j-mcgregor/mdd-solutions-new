import * as React from 'react'

interface FormProps {
    textColor?: string
    labelColor?: string
}

const Form: React.FC<FormProps> = ({ labelColor = 'text-gray-200' }) => {
    return (
        <div>
            <div className="relative w-full mb-3 mt-8">
                <label className={`block uppercase ${labelColor} text-xs font-bold mb-2`} htmlFor="full-name">
                    Full Name
                </label>
                <input
                    type="text"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm focus:outline-none focus:shadow-outline w-full"
                    placeholder="Full Name"
                    style={{ transition: 'all .15s ease' }}
                />
            </div>

            <div className="relative w-full mb-3">
                <label className={`block uppercase ${labelColor} text-xs font-bold mb-2`} htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm focus:outline-none focus:shadow-outline w-full"
                    placeholder="Email"
                    style={{ transition: 'all .15s ease' }}
                />
            </div>

            <div className="grid grid-cols-2 gap-10">
                <div className="relative w-full mb-3">
                    <label className={`block uppercase ${labelColor} text-xs font-bold mb-2`} htmlFor="email">
                        City
                    </label>
                    <input
                        type="email"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm focus:outline-none focus:shadow-outline w-full"
                        placeholder="City"
                        style={{ transition: 'all .15s ease' }}
                    />
                </div>

                <div className="relative w-full mb-3">
                    <label className={`block uppercase ${labelColor} text-xs font-bold mb-2`} htmlFor="email">
                        County
                    </label>
                    <input
                        type="email"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm focus:outline-none focus:shadow-outline w-full"
                        placeholder="County"
                        style={{ transition: 'all .15s ease' }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-10">
                <div className="relative w-full mb-3">
                    <label className={`block uppercase ${labelColor} text-xs font-bold mb-2`} htmlFor="email">
                        Phone
                    </label>
                    <input
                        type="email"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm focus:outline-none focus:shadow-outline w-full"
                        placeholder="Phone"
                        style={{ transition: 'all .15s ease' }}
                    />
                </div>

                <div className="relative w-full mb-3">
                    <label className={`block uppercase ${labelColor} text-xs font-bold mb-2`} htmlFor="email">
                        LinkedIn
                    </label>
                    <input
                        type="email"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm focus:outline-none focus:shadow-outline w-full"
                        placeholder="LinkedIn"
                        style={{ transition: 'all .15s ease' }}
                    />
                </div>
            </div>

            <div className="relative w-full mb-3">
                <label className={`block uppercase ${labelColor} text-xs font-bold mb-2`} htmlFor="message">
                    Message
                </label>
                <textarea
                    rows={4}
                    cols={80}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shaw focus:outline-none focus:shadow-outline w-full"
                    placeholder="Type a message..."
                />
            </div>
            <div className="text-center mt-6">
                <button
                    className="bg-blue-800 hover:bg-yellow-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: 'all .15s ease' }}
                >
                    Send Message
                </button>
            </div>
        </div>
    )
}

export default Form
