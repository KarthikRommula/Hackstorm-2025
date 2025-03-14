'use client'
import React, { useRef, useState, useEffect } from 'react';
import {
    Clock, Trophy, ClipboardList, Mail,
    Book, Users, Calendar, HelpCircle, MapPin, Award, Medal, Instagram, Crown, Star, Globe, Building2, DollarSign

} from 'lucide-react';
const REGISTRATION_END_DATE = '2025-03-05T00:00:00';

const isRegistrationClosed = () => {
    const now = new Date().getTime();
    const endDate = new Date(REGISTRATION_END_DATE).getTime();
    return now > endDate;
};

// Registration button component
const RegistrationButton = () => {
    const [isDisabled, setIsDisabled] = useState(isRegistrationClosed());

    useEffect(() => {
        // Check registration status initially and set up interval
        const checkRegistration = () => {
            setIsDisabled(isRegistrationClosed());
        };

        // Update every minute
        const interval = setInterval(checkRegistration, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <button
            onClick={() => !isDisabled && window.open("https://forms.gle/kicTLp2by7oMfuJk6", "_blank")}
            className={`w-full sm:w-auto px-8 py-4 rounded-lg font-bold transition-all ${isDisabled
                ? 'bg-gray-600 cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90'
                }`}
            disabled={isDisabled}
        >
            {isDisabled ? 'Registration Closed' : 'Register Now'}
        </button>
    );
};

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
                    <div className="max-w-4xl mx-auto space-y-8">
                        {/* Header */}
                        <div className="text-center space-y-2">
                            <h2 className="text-4xl font-bold text-blue-600">PRIZE POOL</h2>
                            <div className="inline-block bg-blue-50 rounded-full px-6 py-2">
                                <h3 className="text-4xl font-extrabold text-blue-700">
                                    ₹10,000
                                </h3>
                            </div>
                        </div>

                        {/* Prize Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* First Place */}
                            <Card className="p-6 text-center space-y-4 transform hover:scale-105 transition-transform duration-200">
                                <Trophy className="w-12 h-12 mx-auto text-[#FFD700]" />

                                <div>
                                    <h4 className="font-bold text-2xl text-[#FFD700]">First Place</h4>
                                    <p className="text-3xl font-extrabold text-500">₹5,000</p>
                                </div>
                            </Card>

                            {/* Second Place */}
                            <Card className="p-6 text-center space-y-4 transform hover:scale-105 transition-transform duration-200">
                                <Award className="w-12 h-12 mx-auto text-gray-400" />
                                <div>
                                    <h4 className="font-bold text-2xl text-gray-400">Second Place</h4>
                                    <p className="text-3xl font-extrabold text-silver-500">₹3,000</p>
                                </div>
                            </Card>

                            {/* Third Place */}
                            <Card className="p-6 text-center space-y-4 transform hover:scale-105 transition-transform duration-200">
                                <Medal className="w-12 h-12 mx-auto text-[#CD7F32]" />
                                <div>
                                    <h4 className="font-bold text-2xl text-[#CD7F32]">Third Place</h4>
                                    <p className="text-3xl font-extrabold text-600">₹2,000</p>
                                </div>
                            </Card>
                        </div>

                        {/* Additional Rewards Card */}
                        <Card className="p-6 bg-trasnparent ">
                            <h4 className="font-bold text-2xl mb-4 text-blue-600">Additional Rewards</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center space-x-3">
                                    <Trophy className="w-6 h-6 text-[#FFD700]" />
                                    <p className="text-700">MVP Trophy</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Star className="w-6 h-6 text-white-600" />
                                    <p className="text-700">Merit Certificates for winners</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Star className="w-6 h-6 text-white-600" />
                                    <p className="text-700">Participation Certificates</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                )
            },
            sponsors: {
                icon: <DollarSign className="w-5 h-5" />,
                title: "Sponsors",
                content: (
                    <div className="max-w-4xl mx-auto space-y-8">
                        {/* Header */}
                        <div className="text-center space-y-2">
                            <h2 className="text-4xl font-bold text-blue-600">OUR SPONSORS</h2>
                            <p className="text-lg text-gray-300">The companies and organizations that make HackStorm 2025 possible</p>
                        </div>

                        {/* Platinum Sponsors */}
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="p-6 text-center space-y-4 transform hover:scale-105 transition-transform duration-200">
                                    <div className="h-24 flex items-center justify-center">
                                        <img
                                            src="/images/sponsor ceo.jpg"
                                            alt="FilmGrid Logo"
                                            className="max-h-full"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xl">FilmGrid</h4>
                                        <p className="text-gray-400 text-justify">FilmGrid roots began when a filmmaker decided to combine his passion for cameras and love of technology, to enable access to idle gear for aspiring creatives, with the launch of the first FilmGrid community soon, FilmGrid plans to grow nationwide to network of artists around India coming together to share creative gear with each other.</p>
                                    </div>
                                </Card>
                                <Card className="p-6 text-center space-y-4 transform hover:scale-105 transition-transform duration-200">
                                    <div className="h-24 flex items-center justify-center">
                                        <img
                                            src="/images/Levitica logo.jpg"
                                            alt="Levitica Logo"
                                            className="max-h-full"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xl">Levitca</h4>
                                        <p className="text-gray-400 text-justify">Levitica Technologies is a full-service Web development and software testing agency that puts its focus on achieving key business objectives, rather than just aesthetics or mere technical implementation. Conversions, transactions, engagement, usability, marketability, revenue, ROI, etc., are some very popular words at Levitica Technologies.
                                    </p>
                                    </div>
                                </Card>

                            </div>
                        </div>
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
                                <li>Teams must consist of 4 members</li>
                                <li>Each team must register before the hackathon begins</li>
                                <li>Teams must work only during the designated 24-hour period</li>
                                <li>All code must be written during the hackathon</li>
                                <li>Use of open-source libraries and APIs is permitted if credited</li>
                            </ul>
                        </Card>
                        <Card>
                            <h4 className="font-bold text-xl mb-2">Project Requirements</h4>
                            <ul className="list-disc list-inside space-y-2">
                                <li>One problem statement will be provided from Themes on Orientation session i.e on DAY -1</li>
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
                            <h4 className="font-bold text-xl mb-2">Day 1 - March 10th, 2025</h4>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>10:00 AM - 12:00 NOON:</strong> Opening Ceremony</li>
                                <li><strong>12:00 NOON - 1:30 PM:</strong> Discussion Session</li>
                                <li><strong>1:30 PM - 2:30 PM:</strong> Lunch Break</li>
                                <li><strong>2:30 PM - 5:00 PM:</strong> Development Phase</li>
                                <li><strong>5:00 PM - 5:30 PM:</strong>Break</li>
                                <li><strong>5:30 PM - 8:30 PM:</strong>Ongoing Development - Session I</li>
                                <li><strong>8:30 PM - 9:30 PM:</strong> Dinner Break</li>
                                <li><strong>9:30 PM - 12:00 AM:</strong> Ongoing Development - Session II</li>
                            </ul>
                        </Card>
                        <Card>
                            <h4 className="font-bold text-xl mb-2">Day 2 - March 11th, 2025</h4>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>12:00 AM - 7:30 AM:</strong> Ongoing Development - Session III</li>
                                <li><strong>7:30 AM - 8:30 AM:</strong> Breakfast</li>
                                <li><strong>8:30 AM - 10:00 AM:</strong> Final Development Session</li>
                                <li><strong>10:00 AM - 11:00 AM:</strong> Break</li>
                                <li><strong>11:00 AM - 1:00 PM:</strong> Project Presentations</li>
                                <li><strong>1:00 PM - 2:00 PM:</strong> Lunch Break</li>
                                <li><strong>2:00 PM - 4:00 PM:</strong> Award Ceremony & Closing Remarks</li>
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
                            <p>Built Social  media & communication through technology</p>
                        </Card>
                        <Card>
                            <h4 className="font-bold text-xl mb-2">5. Exciting Theme Coming Soon!</h4>
                        </Card>
                    </div>
                )
            },
            mentors: {
                icon: <Users className="w-5 h-5" />,
                title: "Expert Committee",
                content: (
                    <div className="space-y-4">
                        <Card>
                            <h4 className="font-bold text-xl mb-2">Technical Expertise</h4>
                            <ul className="list-disc list-inside space-y-2">
                                <li className="font-bold text-l mb-2">P S V PRASAD.</li>
                                <li>Data Scientist with expertise in Machine Learning, NLP, Generative AI,</li>
                            </ul>
                        </Card>
                        <Card>
                            <h4 className="font-bold text-xl mb-2">Business Expertise</h4>
                            <ul className="list-disc list-inside space-y-2">
                                <li className="font-bold text-l mb-2">Medipudi Durgaprasad.</li>
                                <li>CEO-Levitica Pvt Ltd.Hyderabad.</li>
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
                                a: "I, II,III Btech students with a passion for technology can participate. All skill levels are welcome!"
                            },
                            {
                                q: "What should I bring?",
                                a: <>Bring your laptop, charger, and any other devices you need, Personal belongings.
                                </>
                            },
                            {
                                q: "Is there a participation fee?",
                                a: "The participation fee is ₹400 per person. We aim to make the event affordable and accessible to everyone."
                            },
                            {
                                q: "Food and refreshments will be available throughout the event?",
                                a: <>
                                    Food will be provided as follows:
                                    <br />
                                    Day 1: Dinner, snacks (Lays, biscuits, drinks, tea or coffee)<br />
                                    Day 2: Breakfast, lunch, and snacks.</>
                            },
                            {
                                q: "Early Submission (up to 2 bonus points)?",
                                a: <>
                                    If a team submits their project before the deadline, they can earn up to 2 extra points.
                                    <br />The earlier they submit, the higher the chance of getting full bonus points.</>
                            },
                            {
                                q: "Regular Commits Throughout the 24 Hours (up to 2 bonus points)?",
                                a: <>
                                    Consistently push updates to their code repository (e.g., GitHub, GitLab) instead of waiting until the last minute.
                                    <br />
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
            score: {
                icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    {/* Star at the top */}
                    <path d="M12 2l-1.5 3-3.5 0.5 2.5 2.5-0.6 3.5 3.1-1.5 3.1 1.5-0.6-3.5 2.5-2.5-3.5-0.5z" />

                    {/* Podium - 3 blocks */}
                    <path d="M5 15v5h4v-5h-4z" />         {/* Third place (left) */}
                    <path d="M10 12v8h4v-8h-4z" />        {/* First place (center) - taller */}
                    <path d="M15 15v5h4v-5h-4z" />        {/* Second place (right) */}

                    {/* Base of podium */}
                    <path d="M3 20h18v1H3z" />
                </svg>,
                title: "Scoreboard",
                content: (
                    <div className="max-w-4xl mx-auto p-6 space-y-8">
                        {/* Scoreboard Header */}
                        <div className="text-center">
                            <h2 className="text-4xl font-bold text-blue-600 mb-4">SCOREBOARD</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* 🏆 Champion */}
                            <Card className=" h-64 p-6 text-center space-y-3 transform hover:scale-105 transition-transform duration-500 bg-gradient-to-r from-yellow-500 to-orange-500 shadow-2xl border border-yellow-400 rounded-3xl backdrop-blur-lg">
                                <Medal className="w-14 h-14 mx-auto text-white drop-shadow-2xl" />
                                <h4 className="font-extrabold text-3xl text-white uppercase tracking-wide">Champion</h4>
                                <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-base text-gray-200 italic font-medium">
                                    NAME
                                </p>
                            </Card>

                            {/* 🥈 Runner-Up */}
                            <Card className=" h-64 p-6 text-center space-y-3 transform hover:scale-105 transition-transform duration-500 bg-gradient-to-r from-gray-400 to-gray-600 shadow-lg border border-gray-500 rounded-3xl backdrop-blur-lg">
                                <Trophy className="w-14 h-14 mx-auto text-white drop-shadow-2xl" />
                                <h4 className="font-extrabold text-3xl text-white uppercase tracking-wide">Runner-Up</h4>
                                <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-base text-gray-200 italic font-medium">
                                    NAME
                                </p>
                            </Card>

                            {/* 🥉 Second Runner-Up (Bronze Background) */}
                            <Card className="h-64 p-6 text-center space-y-3 transform hover:scale-105 transition-transform duration-500 bg-gradient-to-r from-gray-700 to-gray-900 shadow-lg border border-gray-500 rounded-3xl backdrop-blur-lg">
                                <Award className="w-14 h-14 mx-auto text-white drop-shadow-2xl" />
                                <h4 className="font-extrabold text-3xl text-white uppercase tracking-wide"> SECOND Runner-Up</h4>
                                <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-base text-gray-200 italic font-medium">
                                    NAME
                                </p>
                            </Card>

                            {/* 👑 Most Valuable Player (MVP) */}
                            <Card className="h-64 p-6 text-center space-y-3 transform hover:scale-105 transition-transform duration-500 bg-gradient-to-r from-purple-700 to-indigo-700 shadow-2xl border border-purple-500 rounded-3xl backdrop-blur-lg">
                                <Crown className="w-14 h-14 mx-auto text-yellow-400 drop-shadow-2xl" />
                                <h4 className="font-extrabold text-3xl text-white uppercase tracking-wide">MVP</h4>
                                <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-base text-gray-200 italic font-medium">
                                    NAME
                                </p>
                            </Card>
                        </div>

                        {/* Detailed Scoreboard */}
                        <Card className="p-6 shadow-md">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-blue-50">
                                            <th className="p-3 text-left border-b">Rank</th>
                                            <th className="p-3 text-left border-b">Team Name</th>
                                            <th className="p-3 text-left border-b">Score</th>
                                            <th className="p-3 text-left border-b">Theme</th>
                                        </tr>
                                    </thead>
                                    <tbody>{
                                        [
                                            { "rank": 1, "name": "Detech-T", "score": 0, "category": "" },
                                            { "rank": 2, "name": "InnoMind's", "score": 0, "category": "" },
                                            { "rank": 3, "name": "CodeX", "score": 0, "category": "" },
                                            { "rank": 4, "name": "Sleep Deprived", "score": 0, "category": "" },
                                            { "rank": 5, "name": "Team Avengers", "score": 0, "category": "" },
                                            { "rank": 6, "name": "Visionary Ventures", "score": 0, "category": "" },
                                            { "rank": 7, "name": "Deep thinkers", "score": 0, "category": "" },
                                            { "rank": 8, "name": "Code Master", "score": 0, "category": "" },
                                            { "rank": 9, "name": "Tech knights", "score": 0, "category": "" },
                                            { "rank": 10, "name": "Team Neem", "score": 0, "category": "" },
                                            { "rank": 11, "name": "CODE SNIPPET", "score": 0, "category": "" },
                                            { "rank": 12, "name": "Vyas", "score": 0, "category": "" },
                                            { "rank": 13, "name": "code Hunters", "score": 0, "category": "" },
                                            { "rank": 14, "name": "Innovartx", "score": 0, "category": "" },
                                            { "rank": 15, "name": "Code crafters", "score": 0, "category": "" },
                                            { "rank": 16, "name": "Code pioneers", "score": 0, "category": "" },
                                            { "rank": 17, "name": "Hack38", "score": 0, "category": "" },
                                            { "rank": 18, "name": "ERRORS", "score": 0, "category": "" },
                                            { "rank": 19, "name": "Team phoenix", "score": 0, "category": "" },
                                            { "rank": 20, "name": "Debug Dudes", "score": 0, "category": "" },
                                            { "rank": 21, "name": "Code Crackers", "score": 0, "category": "" },
                                            { "rank": 22, "name": "Pavan's Team", "score": 0, "category": "" },
                                            { "rank": 23, "name": "Bug Slayers", "score": 0, "category": "" },
                                            { "rank": 24, "name": "TEAM KANYARASI", "score": 0, "category": "" },
                                            { "rank": 25, "name": "Harish's Team", "score": 0, "category": "" },
                                            { "rank": 26, "name": "Tech T-Rex", "score": 0, "category": "" },
                                            { "rank": 27, "name": "Team Kernel", "score": 0, "category": "" },
                                            { "rank": 28, "name": "TEAM MARVEL", "score": 0, "category": "" },
                                            { "rank": 29, "name": "TEAMLESS", "score": 0, "category": "" },
                                            { "rank": 30, "name": "ANKITH", "score": 0, "category": "" }
                                        ]
                                            .map((entry) => (
                                                <tr key={entry.rank}>
                                                    <td className="p-3 border-b">{entry.rank}</td>
                                                    <td className="p-3 border-b">{entry.name}</td>
                                                    <td className="p-3 border-b">{entry.score}</td>
                                                    <td className="p-3 border-b">{entry.category}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                    </div>
                )
            },
            contact: {
                icon: <Mail className="w-6 h-6" />,
                title: "About",
                content: (
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                        {/* Left Section - Contact Details */}
                        <div className="md:w-2/3 space-y-4">
                            {[
                                {
                                    q: " About the College",
                                    a: <>
                                        HACK Storm 2025 is organized by AI CLUB of KG REDDY COLLEGE OF ENGINEERING & TECHNOLOGY.
                                        <br />Located at Chilkur, Moinabad, Ranga Reddy, Telangana.
                                        <br />
                                        Our institution is committed to fostering innovation and technical excellence.
                                    </>
                                },
                                {
                                    q: "About the Department",
                                    a: (
                                        <>
                                            <p>
                                                B. Tech in Artificial Intelligence & Machine Learning is an undergraduate
                                                programme with advanced learning solutions imparting knowledge of advanced
                                                innovations like machine learning, often called deep learning, and artificial
                                                intelligence.
                                                <br />
                                                This specialization is designed to enable students to build intelligent machines, software, or applications with a cutting-edge combination of machine learning, analytics and visualization technologies. The main goal of artificial intelligence (AI) learning is to program computers to use example data or experience to solve a given problem.
                                                <br />
                                                This programme discusses AI methods based in different fields, including neural networks, signal processing, control, and data mining, in order to present a unified treatment of machine learning problems and solutions.
                                            </p>

                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <img
                                                    src="/images/CHAIRMAN.jpg"
                                                    alt="CHAIRMAN Image"
                                                    width="100"
                                                    height="100"
                                                    style={{ borderRadius: "0%", marginRight: "15px", marginTop: "10px" }}
                                                />
                                                <div>
                                                    <h4 className="font-bold text-sm">Ln. K. Krishna Reddy</h4>
                                                    <p className="font-light">Chairman</p>
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <img
                                                    src="/images/DIRECTOR.jpg"
                                                    alt="DIRECTOR Image"
                                                    width="100"
                                                    height="100"
                                                    style={{ borderRadius: "0%", marginRight: "15px", marginTop: "10px" }}
                                                />
                                                <div>
                                                    <h4 className="font-bold text-sm">Dr. Rohit Kandakatla</h4>
                                                    <p className="font-light">Director</p>
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <img
                                                    src="/images/Principal.png"
                                                    alt="Principal Image"
                                                    width="100"
                                                    height="100"
                                                    style={{ borderRadius: "0%", marginRight: "15px", marginTop: "10px" }}
                                                />
                                                <div>
                                                    <h4 className="font-bold text-sm">Dr. S. SAI SATYANARAYANA REDDY</h4>
                                                    <p className="font-light">Principal</p>
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <img
                                                    src="/images/HOD.jpg"
                                                    alt="HOD Image"
                                                    width="100"
                                                    height="100"
                                                    style={{ borderRadius: "0%", marginRight: "15px", marginTop: "10px" }}
                                                />
                                                <div>
                                                    <h4 className="font-bold text-sm">Prof. Rambabu Mudusu</h4>
                                                    <p className="font-light">HoD Of CSE - AI&ML</p>
                                                </div>
                                            </div>
                                        </>
                                    )
                                },

                                {
                                    q: "Club Coordinators",
                                    a: (
                                        <div>
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li><strong>B. AARTHIK</strong> - PRESIDENT</li>
                                                <li><strong>R. KARTHIK</strong> - VICE PRESIDENT</li>
                                                <li><strong>G. KARTHIK</strong> - SECRETARY</li>
                                                <li><strong>AKSHITHA NAMAJI</strong> - HEAD OF OPERATIONS</li>
                                                <li><strong>ABHAY KUMAR</strong> - HEAD OF DOCUMENTATION</li>
                                                <li><strong>SAI TARUN REDDY</strong> - HEAD OF PUBLICITY</li>
                                                <li><strong>D. BHAVYA SREE</strong> - HEAD OF SOCIAL MEDIA</li>
                                            </ul>
                                        </div>
                                    )
                                },
                                {
                                    q: "General Inquiries",
                                    a: <>
                                        For any queries, feel free to reach out to us at <br />
                                        <a href="mailto:officialkarthik1819@gmail.com" className="text-600">
                                            officialkarthik1819@gmail.com
                                        </a> or call us at
                                        <a href="tel:+916301308494" className="text-600 ml-1">
                                            +91-6301308494
                                        </a>.
                                        <br />
                                        <div className="mt-4">
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2264.5937963021493!2d78.28989077328994!3d17.335917334148874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbeab272796741%3A0x73864d0007766678!2sKG%20Reddy%20College%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1739953467651!5m2!1sen!2sin"
                                                width="100%"
                                                height="300"
                                                style={{ border: 0, borderRadius: "10px" }}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            ></iframe>
                                        </div>


                                        {/* External Google Maps Link */}
                                        <a
                                            href="https://maps.app.goo.gl/W6BMzjwvN4aVWu93A"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 mt-2 text-blue-600 font-medium hover:text-blue-800"
                                        >
                                            <MapPin className="w-5 h-5 text-blue-600" />
                                            Open in Google Maps
                                        </a>
                                    </>

                                },
                                {
                                    q: "Follow Us",
                                    a: (
                                        <div className="flex space-x-4">
                                            <a href="https://www.instagram.com/aiclub_kgr/" className="flex items-center text-pink-500 space-x-2">
                                                <Instagram className="w-5 h-5" />
                                                <span></span>
                                            </a>
                                            <a href="https://kgr.ac.in/" target="_blank" rel="noopener noreferrer" className="text-blue-500">KGRCET</a>
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
                        <div className="sm:w-1/3 md:w-1/3 lg:w-1/3 flex flex-col space-y-6" style={{ marginTop: "30px" }}>
                            <img
                                src="/images/COLLEGE_PIC.jpeg"
                                alt="College Building"
                                className="rounded-lg shadow-lg w-full object-cover"
                            />
                            <img
                                src="/images/COLLEGE_PIC5.jpg"
                                alt="College Building"
                                className="rounded-lg shadow-lg w-full object-cover"
                            />
                            <img
                                src="/images/COLLEGE_PIC4.jpg"
                                alt="College Building"
                                className="rounded-lg shadow-lg w-full object-cover hidden sm:block"
                            />
                            <img
                                src="/images/COLLEGE_PIC3.jpeg"
                                alt="College Building"
                                className="rounded-lg shadow-lg w-full object-cover hidden sm:block"
                            />
                            <img
                                src="/images/COLLEGE_PIC2.jpeg"
                                alt="College Building"
                                className="rounded-lg shadow-lg w-full object-cover hidden sm:block"
                            />
                            <img
                                src="/images/COLLEGE_PIC6.jpg"
                                alt="College Building"
                                className="rounded-lg shadow-lg w-full object-cover hidden sm:block"
                            />
                            <img
                                src="/images/COLLEGE_PIC7.jpg"
                                alt="College Building"
                                className="rounded-lg shadow-lg w-full object-cover hidden sm:block"
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

    // Add useEffect to handle viewport meta tag
    useEffect(() => {
        // Create or update viewport meta tag
        let viewportMeta = document.querySelector('meta[name="viewport"]');
        if (!viewportMeta) {
            viewportMeta = document.createElement('meta');
            viewportMeta.name = 'viewport';
            document.head.appendChild(viewportMeta);
        }
        viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';

        // Cleanup function
        return () => {
            if (viewportMeta) {
                viewportMeta.content = 'width=device-width, initial-scale=1.0';
            }
        };
    }, []);
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
            <nav className="fixed w-full z-50 bg-white border-b border-gray-300 shadow-md h-16 md:h-20">
                <div className="max-w-full mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Left: College Logo */}
                        <div className="flex-shrink-0">
                            <img
                                src="/images/CLG LOGO.jpg"
                                alt="College Logo"
                                className="h-16 sm:h-12 md:h-14 lg:h-16 w-40 xs:w-40 xs:h-40 -mt-4 sm:-mt-0"
                            />
                        </div>

                        {/* Desktop navigation */}
                        <div className="hidden lg:flex items-center space-x-4">
                            {Object.values(tabCategories).map(category =>
                                Object.entries(category.tabs).map(([key, tab]) => (
                                    <button
                                        key={key}
                                        onClick={() => handleTabChange(key)}
                                        className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === key
                                            ? 'bg-purple-100 text-purple-700'
                                            : 'text-gray-900 hover:bg-gray-200'
                                            }`}
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
                            className="lg:hidden p-2 text-gray-900 -mt-4 sm:-mt-0"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        {/* AI Club Logo aligned to the right */}
                        <div className="flex-shrink-0">
                            <img
                                src="/images/AI_LOGO-removebg-preview.png"
                                alt="AI Logo"
                                className="h-12 md:h-14 lg:h-16 w-40 xs:w-40 -mt-4 sm:-mt-0"
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
                        <p className="text-xl md:text-2xl text-gray-300">30 - Hour Innovation Challenge</p>
                        <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400  block">
                            March 10-11, 2025
                        </span>


                        {/* Countdown timer */}
                        <div className="py-8">
                            <h2 className="text-2xl font-bold mb-6">Registration Closes In:</h2>
                            <CountdownTimer endDate={REGISTRATION_END_DATE} />
                        </div>

                        {/* CTA buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <RegistrationButton />


                            <button
                                onClick={() => handleTabChange('prizes')}
                                className="w-full sm:w-auto px-8 py-4 rounded-lg border border-white/20 transition-all hover:bg-gray-800/50"
                            >
                                Learn More
                            </button>
                            <button
                                onClick={() => handleTabChange('contact')}
                                className="w-full sm:w-auto px-8 py-4 rounded-lg bg-gradient-to-r from-orange-500 to-rose-400 font-bold transition-all hover:opacity-90"

                            >
                                About Us
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
