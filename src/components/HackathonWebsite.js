'use client'
import React, { useRef,useState, useEffect } from 'react';
import { Clock, Trophy, Book, Users, Calendar, HelpCircle, MapPin, MessageSquare, Code } from 'lucide-react';

const REGISTRATION_END_DATE = '2025-03-01T00:00:00'; // Set your fixed end date here

// Reusable components
const Card = ({ children, className = "" }) => (
    <div className={`bg-gray-900/50 p-4 rounded-lg shadow-md will-change-transform ${className}`}>
        {children}
    </div>
);

const TabButton = ({ isActive, onClick, icon, title, className = "" }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2
            ${isActive ? "bg-purple-500/20 text-purple-400" : "text-gray-300 hover:text-white hover:bg-gray-800/50"}
            ${className}`}
    >
        {icon}
        <span>{title}</span>
    </button>
);

const CountdownTimer = ({ endDate }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const distance = new Date(endDate).getTime() - now;

            if (distance < 0) {
                return {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                };
            }

            return {
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            };
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [endDate]);

    const timeUnits = [
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {timeUnits.map(({ label, value }) => (
                <div
                    key={label}
                    className="bg-gray-900/50 rounded-lg p-4 text-center shadow-md will-change-transform"
                >
                    <div className="text-4xl md:text-5xl font-bold mb-2">{value}</div>
                    <div className="text-sm md:text-base opacity-80">{label}</div>
                </div>
            ))}
        </div>
    );
};

// Tab configurations
const tabs = {
    prizes: {
        icon: <Trophy className="w-6 h-6" />,
        title: "Prizes",
        content: (
            <div className="space-y-4">
                <Card>
                    <h4 className="font-bold text-xl mb-2">🏆 First Place - $5,000</h4>
                    <p>Plus latest MacBook Pro and mentorship opportunity</p>
                </Card>
                <Card>
                    <h4 className="font-bold text-xl mb-2">🥈 Second Place - $3,000</h4>
                    <p>Plus latest iPad Pro and development subscription</p>
                </Card>
                <Card>
                    <h4 className="font-bold text-xl mb-2">🥉 Third Place - $2,000</h4>
                    <p>Plus latest AirPods Pro and cloud credits</p>
                </Card>
            </div>
        )
    },
    rules: {
        icon: <Book className="w-6 h-6" />,
        title: "Rules",
        content: (
            <div className="space-y-4">
                <Card>
                    <h4 className="font-bold text-xl mb-2">Team Formation</h4>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Teams must consist of 2-4 members</li>
                        <li>Cross-functional teams are encouraged</li>
                        <li>Solo participants will be helped to find team members</li>
                    </ul>
                </Card>
                <Card>
                    <h4 className="font-bold text-xl mb-2">Code & Development</h4>
                    <ul className="list-disc list-inside space-y-2">
                        <li>All code must be written during the hackathon</li>
                        <li>Use of open-source libraries is allowed</li>
                        <li>Code must be submitted to GitHub</li>
                    </ul>
                </Card>
            </div>
        )
    },
    schedule: {
        icon: <Calendar className="w-6 h-6" />,
        title: "Schedule",
        content: (
            <div className="space-y-4">
                <Card>
                    <h4 className="font-bold text-xl mb-2">Day 1</h4>
                    <ul className="list-disc list-inside space-y-2">
                        <li>9:00 AM - Opening Ceremony</li>
                        <li>10:00 AM - Hacking Begins</li>
                        <li>2:00 PM - Workshop Sessions</li>
                    </ul>
                </Card>
                <Card>
                    <h4 className="font-bold text-xl mb-2">Day 2</h4>
                    <ul className="list-disc list-inside space-y-2">
                        <li>9:00 AM - Project Check-in</li>
                        <li>3:00 PM - Final Submissions</li>
                        <li>6:00 PM - Awards Ceremony</li>
                    </ul>
                </Card>
            </div>
        )
    },
    mentors: {
        icon: <Users className="w-6 h-6" />,
        title: "Mentors",
        content: (
            <div className="space-y-4">
                
            <Card>
                <h4 className="font-bold text-xl mb-2">Technical Mentors</h4>
                <ul className="list-disc list-inside space-y-2">
                    <li>Senior Engineers from FAANG companies</li>
                    <li>Cloud Architecture Experts</li>
                    <li>UI/UX Design Specialists</li>
                </ul>
            </Card>
            <Card>
                <h4 className="font-bold text-xl mb-2">Business Mentors</h4>
                <ul className="list-disc list-inside space-y-2">
                    <li>Startup Founders</li>
                    <li>Product Managers</li>
                    <li>VC Partners</li>
                </ul>
            </Card>
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
                    <Card key={index}>
                        <h4 className="font-bold text-lg mb-2">{item.q}</h4>
                        <p>{item.a}</p>
                    </Card>
                ))}
            </div>
        )
    }
};

const HackathonWebsite = () => {
    const [activeTab, setActiveTab] = useState('prizes');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const tabsRef = useRef(null);

    const scrollToTabs = () => {
        tabsRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    const handleTabChange = (key) => {
        setActiveTab(key);
        scrollToTabs();
        setMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="fixed inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.2),rgba(0,0,0,0))]" />
            </div>

            <nav className="fixed w-full z-50 bg-gray-900/80 border-b border-white/10 shadow-lg backdrop-blur-sm">
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
                                <TabButton
                                    key={key}
                                    isActive={activeTab === key}
                                    onClick={() => handleTabChange(key)}
                                    icon={value.icon}
                                    title={value.title}
                                />
                            ))}
                        </div>
                        <button
                            className="md:hidden text-white p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            ☰
                        </button>
                    </div>
                </div>
                {mobileMenuOpen && (
                    <div
                        className="md:hidden bg-gray-900/95 border-t border-white/10 shadow-lg backdrop-blur-sm"
                        role="dialog"
                        aria-label="Mobile menu"
                    >
                        {Object.entries(tabs).map(([key, value]) => (
                            <TabButton
                                key={key}
                                isActive={activeTab === key}
                                onClick={() => handleTabChange(key)}
                                icon={value.icon}
                                title={value.title}
                                className="w-full justify-start"
                            />
                        ))}
                    </div>
                )}
            </nav>

            <main className="relative z-10">
                {/* Hero Section */}
                <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-4 pt-16">
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
                            <CountdownTimer endDate={REGISTRATION_END_DATE} />
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={scrollToTabs}
                                className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold transition-all transform hover:scale-105"
                            >
                                Register Now
                            </button>
                            <button
                                onClick={scrollToTabs}
                                className="px-8 py-4 rounded-lg border border-white/20 hover:bg-gray-800/50 transition-all"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                </section>

                {/* Tabs Section */}
                <section
                    ref={tabsRef}
                    id="tabs-section"
                    className="max-w-7xl mx-auto px-4 py-16 scroll-mt-20"
                >
                    <div className="bg-gray-900/50 rounded-2xl shadow-xl border border-white/10 p-6">
                        <div
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
                            role="tablist"
                            aria-label="Hackathon information"
                        >
                            {Object.entries(tabs).map(([key, value]) => (
                                <button
                                    key={key}
                                    role="tab"
                                    aria-selected={activeTab === key}
                                    aria-controls={`${key}-tab`}
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
                        <div
                            id={`${activeTab}-tab`}
                            role="tabpanel"
                            className="p-4"
                        >
                            {tabs[activeTab].content}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="relative z-10 bg-gray-900/80 border-t border-white/10 py-8">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
                    <p>© {new Date().getFullYear()} Hack24. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HackathonWebsite;