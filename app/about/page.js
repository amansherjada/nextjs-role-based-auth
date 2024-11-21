import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const About = () => {
    return (
        <div className="h-screen flex justify-center items-center gap-4 bg-gradient-to-r from-[#f5cbe3] to-[#da135f] relative">
            <Image
                src="/aboutus.png"
                width={500}
                height={500}
                alt="img"
                className="mix-blend-multiply mr-40 transition duration-500 ease-in-out hover:scale-110 transform-gpu delay-100 shadow-md mx-28"
            />
            <div className="container">
                <h1 className="text-5xl font-extrabold text-gray-900">About Us</h1>
                <p className="text-lg text-gray-900 mt-4 mr-20 font-semibold text-justify">
                    Welcome to Clicktopia, where the magic of the internet gets a little better, one click at a time!
                </p>
                <p className="mr-20 text-justify">
                    At Clicktopia, we believe the web should be a place of discovery, delight, and a dash of humor. Whether you’re here to learn, laugh, or just take a break from the chaos of life, our mission is simple: to make every visit worth your while.
                </p>
                <p className="mr-20 text-justify">
                    We started Clicktopia with the idea that small, meaningful moments on the web can brighten your day. From insightful articles to quirky tools and unexpected surprises, we strive to bring you the best of what the internet has to offer.
                    <br />
                    Our team of passionate creators, dreamers, and tech enthusiasts is committed to curating content that’s not only useful but also fun. We’re not just building a website; we’re creating a community—a place where you can explore, engage, and feel right at home.
                </p>
                <br />
                <p className="mr-20 font-semibold text-justify">
                    Why “Making the Internet Slightly Better”?
                </p>
                <p className="mr-20 text-justify">
                    Because we know we can’t change the entire web overnight. But with each thoughtful piece of content, helpful resource, or entertaining feature, we aim to leave the digital world a little brighter than we found it.
                    <br />
                    So, welcome to Clicktopia. Stay a while, click around, and join us in making the internet a better place—one delightful click at a time!
                    <br />
                    Your friends at Clicktopia.
                </p>

            </div>
        </div>
    )
}

export default About