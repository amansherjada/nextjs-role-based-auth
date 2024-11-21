import React from 'react'

const Footer = () => {
    return (
        <div>
            <div className="footer bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="footer-content flex flex-wrap justify-between">
                        <div className="footer-links w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0">
                            <h4 className="uppercase text-lg font-bold mb-2">Quick Links</h4>
                            <ul>
                                <li className="mb-2"><a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                                <li className="mb-2"><a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Terms of Service</a></li>
                                <li className="mb-2"><a href="mailto:lilburneraccount@protonmail.com" className="text-gray-300 hover:text-white">Contact Us</a></li>
                            </ul>
                        </div>
                        <div className="footer-social w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0">
                            <h4 className="uppercase text-lg font-bold mb-2">Follow Us</h4>
                            <ul>
                                <li className="mb-2"><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white"><i className="fa fa-facebook mr-2" aria-hidden="true"></i>Facebook</a></li>
                                <li className="mb-2"><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white"><i className="fa fa-twitter mr-2" aria-hidden="true"></i>Twitter</a></li>
                                <li className="mb-2"><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white"><i className="fa fa-instagram mr-2" aria-hidden="true"></i>Instagram</a></li>
                            </ul>
                        </div>
                        <div className="footer-copyright w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0">
                            <h4 className="uppercase text-lg font-bold mb-2">Copyright</h4>
                            <p>&copy; 2024 Clicktopia. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer