import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Conatct = () => {
    return (
        <div className="h-screen flex justify-center items-center gap-4 bg-gradient-to-r from-[#f9e1af] to-[#ffae00] relative">
            <Image
                src="/contactus.png"
                width={500}
                height={500}
                alt="img"
                className="mix-blend-lighten mr-40 transition duration-500 ease-in-out hover:scale-125 transform-gpu delay-100 mx-28"
            />
            <div className="container">
                <h1 className="text-5xl font-extrabold text-gray-900">Conatct Us</h1>
                <p className="text-lg text-gray-900 mt-4 mr-16 font-semibold text-justify">
                    Get in Touch with Us at Clicktopia
                </p>
                <p className="mr-16 text-justify">
                    Have questions, feedback, or just want to say hello? We’d love to hear from you! At Clicktopia, we’re all about creating connections and making your experience even better.
                </p>
                <p className="mr-16 text-justify">
                    Whether you’re curious about our content, have a suggestion for something we should add, or simply want to share your thoughts, we’re here to listen. Your input helps us grow and improve, making Clicktopia the best place it can be.
                </p>
                <p className="mr-16 font-semibold text-justify">
                    Here’s How You Can Reach Us:
                </p>
                <ul className="list-disc ml-8 mr-16 text-justify">
                    <li>Email: <a href="mailto:support@clicktopia.com" className="text-blue-600 underline">support@clicktopia.com</a></li>
                    <li>Phone: <a href="tel:+1234567890" className="text-blue-600 underline">+1 234 567 890</a></li>
                    <li>Social Media: Follow us on
                        <a href="https://twitter.com" className="text-blue-600 underline"> Twitter</a>,
                        <a href="https://facebook.com" className="text-blue-600 underline"> Facebook</a>, and
                        <a href="https://instagram.com" className="text-blue-600 underline"> Instagram</a>.
                    </li>
                </ul>
                <p className="mr-16 text-justify">
                    Our team is always ready to help and make your time with Clicktopia memorable. We’ll do our best to respond to your inquiries as quickly as possible.
                </p>
                <p className="mr-16 font-semibold text-justify">
                    Let’s Make the Internet Better Together!
                </p>
                <p className="mr-16 text-justify">
                    Thank you for being a part of our community. We look forward to hearing from you and continuing to make Clicktopia your favorite corner of the web.
                </p>


            </div>
        </div>
    )
}

export default Conatct