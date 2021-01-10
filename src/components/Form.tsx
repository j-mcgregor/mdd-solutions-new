import * as React from 'react'

interface FormProps {
    textColor?: string
    labelColor?: string
}

const Form: React.FC<FormProps> = ({ textColor = 'text-white', labelColor = 'text-gray-200' }) => {
    return (
        <div className={`flex-auto p-5 lg:p-10 ${textColor}`}>
            <h4 className="text-2xl font-semibold">Want to work with us?</h4>
            <p className="leading-relaxed mt-1 mb-4">Complete this form and we will get back to you in 24 hours.</p>
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
                    className="bg-yellow-400 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
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
