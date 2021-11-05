import { FormEvent } from 'hoist-non-react-statics/node_modules/@types/react'
import React, { useState, Fragment } from 'react'
import Axios from 'axios'
import { Dialog, Transition } from '@headlessui/react'

interface FormProps {
    textColor?: string
    labelColor?: string
}

const Form: React.FC<FormProps> = ({ labelColor = 'text-gray-200' }) => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState<boolean>(false)
    const [formMessage, setFormMessage] = useState<string>('')
    const [messageSuccess, setMessageSuccess] = useState<boolean | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)

        if (messageSuccess) {
            // EMPTY FORM
            setFullName('')
            setEmail('')
            setCity('')
            setPhone('')
            setMessage('')
        }
    }

    // function encode(data: Record<string, string>) {
    //     return Object.keys(data)
    //         .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    //         .join('&')
    // }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault()

        Axios.post(
            '/',
            { 'form-name': 'contact', fullName, email, phone, city, message },
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }
        )
            .then(() => {
                setMessageSuccess(true)
                setFormMessage("Thanks! We'll be in touch soon!")
                setIsOpen(true)
            })
            .catch((e) => {
                setMessageSuccess(false)
                setFormMessage('Something went wrong, please try emailing us instead')
            })
            .finally(() => setLoading(false))
    }

    return (
        <>
            <form
                name="contact"
                method="POST"
                action="/"
                onSubmit={handleSubmit}
                data-netlify="true"
                data-netlify-recaptcha="true"
                data-netlify-honeypot="bot-field"
            >
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                    <label>
                        Don’t fill this out if you’re human: <input name="bot-field" />
                    </label>
                </p>

                <div className="relative w-full mb-3 mt-8">
                    <label className={`block uppercase ${labelColor} text-xs font-bold mb-2`} htmlFor="fullName">
                        Full Name
                    </label>
                    <input
                        type="text"
                        className="px-3 py-3 placeholder-gray-400 text-dark bg-white rounded text-sm focus:outline-none focus:shadow-outline w-full"
                        placeholder="Full Name"
                        style={{ transition: 'all .15s ease' }}
                        id="fullName"
                        name="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>

                <div className="relative w-full mb-3">
                    <label className={`block uppercase ${labelColor} text-xs font-bold mb-2`} htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        className="px-3 py-3 placeholder-gray-400 text-dark bg-white rounded text-sm focus:outline-none focus:shadow-outline w-full"
                        placeholder="Email"
                        style={{ transition: 'all .15s ease' }}
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-10">
                    <div className="relative w-full mb-3">
                        <label className={`block uppercase ${labelColor} text-xs font-bold mb-2`} htmlFor="email">
                            City
                        </label>
                        <input
                            type="text"
                            className="px-3 py-3 placeholder-gray-400 text-dark bg-white rounded text-sm focus:outline-none focus:shadow-outline w-full"
                            placeholder="City"
                            style={{ transition: 'all .15s ease' }}
                            id="city"
                            name="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative w-full mb-3">
                        <label className={`block uppercase ${labelColor} text-xs font-bold mb-2`} htmlFor="phone">
                            Phone
                        </label>
                        <input
                            type="text"
                            className="px-3 py-3 placeholder-gray-400 text-dark bg-white rounded text-sm focus:outline-none focus:shadow-outline w-full"
                            placeholder="Phone"
                            style={{ transition: 'all .15s ease' }}
                            id="phone"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
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
                        className="px-3 py-3 placeholder-gray-400 text-dark bg-white rounded text-sm shaw focus:outline-none focus:shadow-outline w-full"
                        placeholder="Type a message..."
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <div data-netlify-recaptcha="true"></div>

                <div className="text-center mt-6">
                    <button
                        className={`text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ${
                            loading ? 'bg-blue-400' : 'bg-blue-800 hover:bg-secondary-blue '
                        }`}
                        type="submit"
                        style={{ transition: 'all .15s ease' }}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex">
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Sending...
                            </span>
                        ) : (
                            'Send Message'
                        )}
                    </button>
                </div>
            </form>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="inline-block h-screen align-middle" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div
                                className={`inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl ${
                                    messageSuccess ? 'bg-green-50' : 'bg-red-50'
                                }`}
                            >
                                <Dialog.Title
                                    as="h3"
                                    className={`text-lg font-medium leading-6 ${
                                        messageSuccess ? 'text-green-600' : 'text-red-500'
                                    }`}
                                >
                                    {messageSuccess ? 'Success!' : messageSuccess === false ? 'Oops!' : ''}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">{formMessage}</p>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 border-2 border-gray-400 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >
                                        Got it, thanks!
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Form
