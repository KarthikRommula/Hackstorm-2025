'use client'
import React, { useRef, useState, useEffect } from 'react';
import {
    Clock, Trophy, ClipboardList, Mail,
    Book, Users, Calendar, HelpCircle
} from 'lucide-react';

const REGISTRATION_END_DATE = '2025-03-06T00:00:00';

// Reusable components
const Card = ({ children, className = "" }) => (
    <div className={`bg-gray-900/50 p-4 rounded-lg shadow-md ${className}`}>
        {children}
    </div>
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
                <div key={label} className="bg-gray-900/50 rounded-lg p-4 text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2">{value}</div>
                    <div className="text-sm opacity-80">{label}</div>
                </div>
            ))}
        </div>
    );
};

// Tab content and structure
const tabCategories = {
    essential: {
        tabs: {
            prizes: {
                icon: <Trophy className="w-5 h-5" />,
                title: "Prizes",
                content: (
                    <div className="space-y-4">
                        <Card>
                            <h4 className="font-bold text-xl mb-2">🏆 First Place - ₹2,000</h4>
                        </Card>
                        <Card>
                            <h4 className="font-bold text-xl mb-2">🥈 Second Place - ₹1,500</h4>
                        </Card>
                        <Card>
                            <h4 className="font-bold text-xl mb-2">🥉 Third Place - ₹1,000</h4>
                        </Card>
                    </div>
                )
            },
            rules: {
                icon: <Book className="w-5 h-5" />,
                title: "Rules",
                content: (
                    <div className="space-y-4">
                        <Card>
                            <h4 className="font-bold text-xl mb-2">Team Formation & Participation</h4>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Teams must consist of 2-4 members</li>
                                <li>Each team must register before the hackathon begins</li>
                                <li>Teams must work only during the designated 24-hour period</li>
                                <li>All code must be written during the hackathon</li>
                                <li>Use of open-source libraries and APIs is permitted if credited</li>
                            </ul>
                        </Card>
                        <Card>
                            <h4 className="font-bold text-xl mb-2">Project Requirements</h4>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Choose one problem statement from provided categories</li>
                                <li>Solutions must be original and not previously published</li>
                                <li>Working prototype/MVP must be demonstrated</li>
                                <li>Source code must be on public GitHub repository</li>
                                <li>10-minute presentation required</li>
                            </ul>
                        </Card>
                        <Card>
                            <h4 className="font-bold text-xl mb-2">Technical Guidelines</h4>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Teams must document their tech stack and architecture</li>
                                <li>All APIs/external services used must be documented</li>
                                <li>Code must be appropriately commented</li>
                            </ul>
                        </Card>
                        <Card>
                            <h4 className="font-bold text-xl mb-2">Time Bonuses & Special Considerations </h4>
                            <ul className="list-disc list-inside space-y-2">
                                <li>1.	Early Submission (up to 2 bonus points)</li>
                                <li>2.	Regular Commits Throughout the 24 Hours (up to 2 bonus points)</li>
                            </ul>
                        </Card>
                        <Card>
                            <h4 className="font-bold text-xl mb-2">Disqualification Criteria</h4>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Use of pre-written code.</li>
                                <li> Plagiarism or copyright violation.</li>
                                <li> Missing core problem requirements.</li>
                                <li>Late submissions (past 24-hour mark).</li>
                                <li>Inappropriate content or ethical violations.</li>
                            </ul>
                        </Card>
                    </div>
                )
            },
            schedule: {
                icon: <Calendar className="w-5 h-5" />,
                title: "Schedule",
                content: (
                    <div className="space-y-4">
                        <Card>
                            <h4 className="font-bold text-xl mb-2">Day 1 - March 7th, 2025</h4>
                            <ul className="list-disc list-inside space-y-2">
                                <li>10:00 AM - Opening Ceremony</li>
                                <li>1:00 PM - Hacking Begins</li>
                            </ul>
                        </Card>
                        <Card>
                            <h4 className="font-bold text-xl mb-2">Day 2 - March 8th, 2025</h4>
                            <ul className="list-disc list-inside space-y-2">
                                <li>9:00 AM - Project Check-in</li>
                                <li>10:00 AM - Final Submissions</li>
                                <li>2:00 PM - Awards Ceremony</li>
                            </ul>
                        </Card>
                    </div>
                )
            },
            Themes: {
                icon: <ClipboardList className="w-5 h-5" />,
                title: "Themes",
                content: (
                    <div className="space-y-4">
                        <Card>
                            <h4 className="font-bold text-xl mb-2">1. AI AUTOMATION</h4>
                            <p>Build solutions using artificial intelligence and machine learning</p>
                        </Card>
                        <Card>
                            <h4 className="font-bold text-xl mb-2">2. HealthTech</h4>
                            <p>Create applications for healthcare and wellness</p>
                        </Card>
                        <Card>
                            <h4 className="font-bold text-xl mb-2">3. FinTech</h4>
                            <p>Develop innovative financial technology solutions</p>
                        </Card>
                        <Card>
                            <h4 className="font-bold text-xl mb-2">4. Social MEDIA & COMMUNICATION</h4>
                            <p>Address social challenges through technology</p>
                        </Card>
                        <Card>
                            <h4 className="font-bold text-xl mb-2">5. Exciting Theme Coming Soon!</h4>
                        </Card>
                    </div>
                )
            },
            mentors: {
                icon: <Users className="w-5 h-5" />,
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
                icon: <HelpCircle className="w-5 h-5" />,
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
                                a: <>Bring your laptop, charger, and any other devices you need.
                                <br/> We'll provide food (DAY 1 : DINNER & DAY 2 : BREAKFAST), drinks, and a comfortable workspace.</>
                            },
                            {
                                q: "Is there a participation fee?",
                                a: "The participation fee is ₹400 per person. We aim to make the event affordable and accessible to everyone."
                            },
                            {
                                q: "Early Submission (up to 2 bonus points)?",
                                a: <>
                                If a team submits their project before the deadline, they can earn up to 2 extra points.
                                <br/>The earlier they submit, the higher the chance of getting full bonus points.</>
                            },
                            {
                                q: "Regular Commits Throughout the 24 Hours (up to 2 bonus points)?",
                                a: <>
                                Consistently push updates to their code repository (e.g., GitHub, GitLab) instead of waiting until the last minute. 
                                <br/>
                                Frequent commits (e.g., after each feature) can earn up to 2 extra points.</>

                            },
                        ].map((item, index) => (
                            <Card key={index}>
                                <h4 className="font-bold text-lg mb-2">{item.q}</h4>
                                <p>{item.a}</p>
                            </Card>
                        ))}
                    </div>
                )
            },
            contact: {
                icon: <Mail className="w-6 h-6" />,
                title: "Contact",
                content: (
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                        {/* Left Section - Contact Details */}
                        <div className="md:w-2/3 space-y-4">
                            {[
                                {
                                    q: "College Details",
                                   a: <>
                                    HACK STROM 2025 is hosted by KG REDDY COLLEGE OF ENGINEERING & TECHNOLOGY, located at Chilkur, Moinabad, Ranga Reddy, Telangana.
                                    <br />
                                    Our institution is committed to fostering innovation and technical excellence.
                                </>
                                },
                                {
                                    q: "College Administration",
                                    a: (
                                        <div>
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li><strong>Chairman:</strong> Mr. [Chairman Name]</li>
                                                <li><strong>Director:</strong> Dr. [Director Name]</li>
                                                <li><strong>Principal:</strong> Dr. [Principal Name]</li>
                                                <li><strong>Vice Principal:</strong> Prof. [Vice Principal Name]</li>
                                                <li><strong>HOD (CSE - AI&ML):</strong>Mr. Ram Babu</li>
                                            </ul>
                                        </div>
                                    )
                                },
                                {
                                    q: "Club Coordinators",
                                    a: (
                                        <div>
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li><strong>B.AARTHIK</strong> - PRESIDENT</li>
                                                <li><strong>R.KARTHIK</strong> - VICE PRESIDENT</li>
                                                <li><strong>G.KARTHIK</strong> - SECRETARY</li>
                                            </ul>
                                        </div>
                                    )
                                },
                                {
                                    q: "General Inquiries",
                                    a: "For any queries, feel free to reach out to us at officialkarthik1819@gmail.com or call us at +91-7043692980."
                                },
                                {
                                    q: "Follow Us",
                                    a: (
                                        <div className="flex space-x-4">
                                            <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="text-blue-500">Twitter</a>
                                            <a href="https://linkedin.com/in/yourhandle" target="_blank" rel="noopener noreferrer" className="text-blue-700">LinkedIn</a>
                                            <a href="https://discord.gg/yourdiscord" target="_blank" rel="noopener noreferrer" className="text-purple-500">Discord</a>
                                        </div>
                                    )
                                }
                            ].map((item, index) => (
                                <Card key={index}>
                                    <h4 className="font-bold text-lg mb-2">{item.q}</h4>
                                    {typeof item.a === "string" ? <p>{item.a}</p> : item.a}
                                </Card>
                            ))}
                        </div>

                        {/* Right Section - College Image */}
                        <div className="sm:w-1/3 md:w-1/3 lg:w-1/3 flex flex-col space-y-14" style={{ marginTop: "12px" }}>
                            <img
                                src="/images/COLLEGE_PIC.jpeg" // Replace with actual image path
                                alt="College Building"
                                className="rounded-lg shadow-lg w-full object-cover"
                            />
                            <img
                                src="/images/COLLEGE_PIC2.jpeg" // Replace with actual image path
                                alt="College Building"
                                className="rounded-lg shadow-lg w-full object-cover"
                            />
                            <img
                                src="/images/COLLEGE_PIC3.jpeg" // Replace with actual image path
                                alt="College Building"
                                className="rounded-lg shadow-lg w-full object-cover"
                            />
                        </div>

                    </div>
                )
            }


        }
    }
};

const MobileTabMenu = ({ activeTab, onTabChange, isOpen, onClose }) => (
    <div className={`fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="absolute inset-0 bg-gray-900/95">
            <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b border-gray-800">
                    <h2 className="text-xl font-bold">Menu</h2>
                    <button onClick={onClose} className="p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {Object.entries(tabCategories).map(([categoryKey, category]) => (
                        <div key={categoryKey} className="p-4">
                            <h3 className="text-sm font-semibold text-gray-400 mb-2">{category.title}</h3>
                            <div className="space-y-2">
                                {Object.entries(category.tabs).map(([key, tab]) => (
                                    <button
                                        key={key}
                                        onClick={() => {
                                            onTabChange(key);
                                            onClose();
                                        }}
                                        className={`w-full flex items-center space-x-3 p-3 rounded-lg ${activeTab === key ? 'bg-purple-500/20 text-purple-400' : 'text-gray-300'
                                            }`}
                                    >
                                        {tab.icon}
                                        <span>{tab.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const HackathonWebsite = () => {
    const [activeTab, setActiveTab] = useState('prizes');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const tabsRef = useRef(null);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Combine all tabs into a single object for easier access
    const allTabs = Object.values(tabCategories).reduce((acc, category) => ({
        ...acc,
        ...category.tabs
    }), {});

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="fixed inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.2),rgba(0,0,0,0))]" />
            </div>

            {/* Mobile menu */}
            <MobileTabMenu
                activeTab={activeTab}
                onTabChange={handleTabChange}
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-gray-900/80 border-b border-white/10 shadow-lg backdrop-blur-sm">
                <div className="max-w-full mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Left: College Logo */}
                        <div className="flex-shrink-0">
                            <img
                                src="/images/CLG LOGO.jpg"
                                alt="College Logo"
                                className="h-16 sm:h-12 md:h-14 lg:h-16 w-30 xs:w-40 object-contain"
                            />
                        </div>

                        {/* Desktop navigation */}
                        <div className="hidden lg:flex items-center space-x-4">
                            {Object.values(tabCategories).map(category =>
                                Object.entries(category.tabs).map(([key, tab]) => (
                                    <button
                                        key={key}
                                        onClick={() => handleTabChange(key)}
                                        className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === key ? 'bg-purple-500/20 text-purple-400' : 'text-gray-300 hover:bg-gray-800'}`}
                                    >
                                        <span className="flex items-center space-x-2">
                                            {tab.icon}
                                            <span>{tab.title}</span>
                                        </span>
                                    </button>
                                ))
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="lg:hidden p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}  // Toggle menu
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        {/* AI Club Logo aligned to the right */}
                        <div className="flex-shrink-0 mr-0">
                            <img
                                src="/images/AI LOGO.jpg"
                                alt="AI Logo"
                                className="h-16 sm:h-12 md:h-14 lg:h-16 w-30 xs:w-40 xs:h-40 "
                            />
                        </div>
                    </div>
                </div>
            </nav>



            {/* Main content */}
            <main className="relative z-10 pt-16">
                {/* Hero section */}
                <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <h1 className="text-4xl md:text-6xl font-bold">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                                HackStorm - 2025
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300">24-Hour Innovation Challenge</p>

                        {/* Countdown timer */}
                        <div className="py-8">
                            <h2 className="text-2xl font-bold mb-6">Registration Closes In:</h2>
                            <CountdownTimer endDate={REGISTRATION_END_DATE} />
                        </div>

                        {/* CTA buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => handleTabChange('contact')}
                                className="w-full sm:w-auto px-8 py-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 font-bold transition-all hover:opacity-90"
                            >
                                Register Now
                            </button>
                            <button
                                onClick={() => handleTabChange('Themes')}
                                className="w-full sm:w-auto px-8 py-4 rounded-lg border border-white/20 transition-all hover:bg-gray-800/50"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                </section>

                {/* Content section */}
                <section
                    ref={tabsRef}
                    className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex flex-col items-center min-h-screen "
                >
                    <div className="bg-gray-900/50 rounded-2xl shadow-xl border border-white/10 p-4 sm:p-6 w-full flex-grow mt-[30px]">
                        {/* Modified Tab Categories Layout */}
                        <div className="relative">
                            <div className="flex overflow-x-auto scrollbar-hide pb-4 gap-4 px-2 sm:justify-center ">
                                {Object.entries(tabCategories).map(([categoryKey, category]) => (
                                    <div
                                        key={categoryKey}
                                        className="flex-shrink-0"
                                    >
                                        <div className="flex gap-2">
                                            {Object.entries(category.tabs).map(([key, tab]) => (
                                                <button
                                                    key={key}
                                                    onClick={() => handleTabChange(key)}
                                                    className={`flex items-center justify-center p-3 rounded-lg transition duration-300 ease-in-out min-w-[48px] 
                                                    ${activeTab === key
                                                            ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white scale-105'
                                                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                                        }`}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        {tab.icon}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Active Tab Content */}
                        <div className="mt-6 w-full p-4 sm:p-8 rounded-2xl  text-gray-200">
                            {allTabs[activeTab].content}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="relative z-10 bg-gray-900/80 border-t border-white/10 py-6">

                <div className="border-gray-800 text-center text-gray-400">
                    <p>© HackStorm - 2025. All rights reserved.</p>
                </div>

            </footer>
        </div>
    );
};

export default HackathonWebsite;
