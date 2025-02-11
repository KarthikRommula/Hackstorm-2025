'use client'
// Paste the entire component code here from your original file
import React, { useState, useEffect } from 'react';
import { Clock, Trophy, Book, Users, Calendar, HelpCircle, MapPin, MessageSquare, Code } from 'lucide-react';

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 30);

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = endDate.getTime() - now;

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
            ].map((item, index) => (
                <div
                    key={index}
                    className="bg-gray-900/50 rounded-lg p-4 text-center shadow-md will-change-transform"
                >
                    <div className="text-4xl md:text-5xl font-bold mb-2">{item.value}</div>
                    <div className="text-sm md:text-base opacity-80">{item.label}</div>
                </div>
            ))}
        </div>
    );
}

const HackathonWebsite = () => {
    const [activeTab, setActiveTab] = useState('prizes');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const tabs = {
        prizes: {
            icon: <Trophy className="w-6 h-6" />,
            title: "Prizes",
            content: (
                <div className="space-y-4">
                    <div className="bg-gray-900/50 p-4 rounded-lg shadow-md will-change-transform">
                        <h4 className="font-bold text-xl mb-2">🏆 First Place - $5,000</h4>
                        <p>Plus latest MacBook Pro and mentorship opportunity</p>
                    </div>
                    <div className="bg-gray-900/50 p-4 rounded-lg shadow-md will-change-transform">
                        <h4 className="font-bold text-xl mb-2">🥈 Second Place - $3,000</h4>
                        <p>Plus latest iPad Pro and development subscription</p>
                    </div>
                    <div className="bg-gray-900/50 p-4 rounded-lg shadow-md will-change-transform">
                        <h4 className="font-bold text-xl mb-2">🥉 Third Place - $2,000</h4>
                        <p>Plus latest AirPods Pro and cloud credits</p>
                    </div>
                </div>

            )
        },
        rules: {
            icon: <Book className="w-6 h-6" />,
            title: "Rules",
            content: (
                <div className="space-y-4">
                    <div className="bg-gray-900/50 p-4 rounded-lg shadow-md will-change-transform">
                        <h4 className="font-bold text-xl mb-2">Team Formation</h4>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Teams must consist of 2-4 members</li>
                            <li>Cross-functional teams are encouraged</li>
                            <li>Solo participants will be helped to find team members</li>
                        </ul>
                    </div>
                    <div className="bg-gray-900/50 p-4 rounded-lg shadow-md will-change-transform">
                        <h4 className="font-bold text-xl mb-2">Code & Development</h4>
                        <ul className="list-disc list-inside space-y-2">
                            <li>All code must be written during the hackathon</li>
                            <li>Use of open-source libraries is allowed</li>
                            <li>Code must be submitted to GitHub</li>
                        </ul>
                    </div>
                </div>

            )
        },
        schedule: {
            icon: <Calendar className="w-6 h-6" />,
            title: "Schedule",
            content: (
                <div className="space-y-4">
                    <div className="bg-gray-900/50 p-4 rounded-lg shadow-md will-change-transform">
                        <h4 className="font-bold text-xl mb-2">Day 1</h4>
                        <ul className="list-disc list-inside space-y-2">
                            <li>9:00 AM - Opening Ceremony</li>
                            <li>10:00 AM - Hacking Begins</li>
                            <li>2:00 PM - Workshop Sessions</li>
                        </ul>
                    </div>
                    <div className="bg-gray-900/50 p-4 rounded-lg shadow-md will-change-transform">
                        <h4 className="font-bold text-xl mb-2">Day 2</h4>
                        <ul className="list-disc list-inside space-y-2">
                            <li>9:00 AM - Project Check-in</li>
                            <li>3:00 PM - Final Submissions</li>
                            <li>6:00 PM - Awards Ceremony</li>
                        </ul>
                    </div>
                </div>

            )
        },
        mentors: {
            icon: <Users className="w-6 h-6" />,
            title: "Mentors",
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-900/50 p-4 rounded-lg shadow-md will-change-transform">
                        <h4 className="font-bold text-xl mb-2">Technical Mentors</h4>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Senior Engineers from FAANG companies</li>
                            <li>Cloud Architecture Experts</li>
                            <li>UI/UX Design Specialists</li>
                        </ul>
                    </div>
                    <div className="bg-gray-900/50 p-4 rounded-lg shadow-md will-change-transform">
                        <h4 className="font-bold text-xl mb-2">Business Mentors</h4>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Startup Founders</li>
                            <li>Product Managers</li>
                            <li>VC Partners</li>
                        </ul>
                    </div>
                </div>

            )
        },
        faq: {
            icon: <HelpCircle className="w-6 h-6" />,
            title: "FAQ",
            content: (
                <div className="space-y-4">
                    {[
                        {
                            q: "Who can participate?",
                            a: "Anyone 18 years or older with a passion for technology can participate. All skill levels are welcome!"
                        },
                        {
                            q: "What should I bring?",
                            a: "Bring your laptop, charger, and any other devices you need. We'll provide food, drinks, and a comfortable workspace."
                        },
                        {
                            q: "Is there a participation fee?",
                            a: "No, participation is completely free! We want to make this event accessible to everyone."
                        }
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="bg-gray-900/50 p-4 rounded-lg shadow-md will-change-transform"
                        >
                            <h4 className="font-bold text-lg mb-2">{item.q}</h4>
                            <p>{item.a}</p>
                        </div>

                    ))}
                </div>
            )
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="fixed inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.2),rgba(0,0,0,0))]"></div>
            </div>

            <nav className="fixed w-full z-50 bg-gray-900/80 border-b border-white/10 shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <a href="#" className="flex items-center space-x-2">
                                <Code className="w-8 h-8 text-purple-500" />
                                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                                    Hack24
                                </span>
                            </a>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            {Object.entries(tabs).map(([key, value]) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`px-4 py-2 rounded-lg transition-all ${activeTab === key
                                        ? "bg-purple-500/20 text-purple-400"
                                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                                        }`}
                                >
                                    <div className="flex items-center space-x-2">
                                        {value.icon}
                                        <span>{value.title}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <button
                            className="md:hidden text-white p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            ☰
                        </button>
                    </div>
                </div>
                {mobileMenuOpen && (
                    <div className="md:hidden bg-gray-900/95 border-t border-white/10 shadow-lg">
                        {Object.entries(tabs).map(([key, value]) => (
                            <button
                                key={key}
                                onClick={() => {
                                    setActiveTab(key);
                                    setMobileMenuOpen(false);
                                }}
                                className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50"
                            >
                                <div className="flex items-center space-x-2">
                                    {value.icon}
                                    <span>{value.title}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </nav>


            <main className="relative z-10">
                <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-16">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                                <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                                    24HR Hackathon
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300">
                                Join us for an exciting 24-hour journey of innovation, collaboration, and creation.
                            </p>
                        </div>

                        <div className="py-8">
                            <h2 className="text-2xl font-bold mb-6">Registration Closes In:</h2>
                            <CountdownTimer />
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold transition-all transform hover:scale-105">
                                Register Now
                            </button>
                            <button className="px-8 py-4 rounded-lg border border-white/20 hover:bg-gray-800/50 transition-all">
                                Learn More
                            </button>
                        </div>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-4 py-16">
                    <div className="bg-gray-900/50 rounded-2xl shadow-xl border border-white/10 p-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                            {Object.entries(tabs).map(([key, value]) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`flex flex-col items-center p-4 rounded-lg transition-all ${activeTab === key
                                            ? "bg-purple-500/20 text-purple-400"
                                            : "hover:bg-gray-800/50"
                                        }`}
                                >
                                    {value.icon}
                                    <span className="text-sm font-medium mt-2">{value.title}</span>
                                </button>
                            ))}
                        </div>
                        <div className="p-4">{tabs[activeTab].content}</div>
                    </div>
                </section>
            </main>

            <footer className="relative z-10 bg-gray-900/80 border-t border-white/10 py-8">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
                    <p>© 2024 Hack24. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HackathonWebsite;