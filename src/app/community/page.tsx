

'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Star } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@/hooks/use-window-size';


const mentors = [
    { name: 'D Anitha', designation: 'Mentor (2024-2025)', image: '/images/danitha.jpg', hint: 'woman portrait' },
    { name: 'T Madhavi', designation: 'Mentor (2023-2024)', image: '/images/tmadhavi.jpg', hint: 'woman portrait' },
    { name: 'Naresh Kumar', designation: 'Mentor (2022-2023)', image: '/images/nareshkumar.jpg', hint: 'man portrait' },
];

const executiveBoard = [
  {
    phase: '2025 - 2026',
    title: 'The Apex Phase',
    members: [
        { name: 'Modugula Gowri Shankar Royal', designation: 'President', image: '/images/modugulagowrishankarroyal.jpg', hint: 'man portrait' },
        { name: 'Alla Venu Gopala Reddy', designation: 'Vice-President', image: '/images/allavenugopalareddy.jpg', hint: 'man portrait' },
        { name: 'Nagireddi Aditya', designation: 'Secretary', image: '/images/nagireddiaditya.jpg', hint: 'man portrait' },
        { name: 'K. Sravya', designation: 'Joint-Secretary', image: '/images/ksravya.jpg', hint: 'woman portrait' },
        { name: 'Ediga Harsha Vardhan', designation: 'Joint-Secretary', image: '/images/edigaharshavardhan.jpg', hint: 'man portrait' },
        { name: 'J M Sai Sathvik', designation: 'Innovatech Hardware Lead', image: '/images/jmsaisathvik.jpg', hint: 'man portrait' },
        { name: 'Raghava', designation: 'Innovatech Software Lead', image: '/images/raghava.jpg', hint: 'man portrait' },
        { name: 'P. Varshith Reddy', designation: 'Marketing Lead', image: '/images/pvarshithreddy.jpg', hint: 'man portrait' },
        { name: 'Bavana', designation: 'Content Craft Lead', image: '/images/bavana.jpg', hint: 'woman portrait' },
        { name: 'Sai Manish Reddy', designation: 'Web Development Lead', image: '/images/saimanishreddy.jpg', hint: 'man portrait' },
    ],
  },
  {
    phase: '2024 - 2025',
    title: 'The Synergy Phase',
    members: [
        { name: 'Sai Krishna', designation: 'President', image: '/images/saikrishna.jpg', hint: 'man portrait' },
        { name: 'Showry James', designation: 'Vice President', image: '/images/showryjames.jpg', hint: 'man portrait' },
        { name: 'Charitha Reddy', designation: 'Secretary', image: '/images/charithareddy.jpg', hint: 'woman portrait' },
        { name: 'Alekhya M', designation: 'Joint Secretary', image: '/images/alekhyam.jpg', hint: 'woman portrait' },
        { name: 'Kaushik Chowdary', designation: 'Joint Secretary', image: '/images/kaushikchowdary.jpg', hint: 'man portrait' },
        { name: 'Prem Kumar', designation: 'Web Dev Lead', image: '/images/premkumar.jpg', hint: 'man portrait' },
        { name: 'Koushik Vardhan', designation: 'Hardware Lead', image: '/images/koushikvardhan.jpg', hint: 'man portrait' },
        { name: 'Karthikeya Sachin', designation: 'Software lead', image: '/images/karthikeyasachin.jpg', hint: 'man portrait' },
        { name: 'Laahiri Maganti', designation: 'Marketing Lead', image: '/images/laahirimaganti.jpg', hint: 'woman portrait' },
        { name: 'Divya Madhuri', designation: 'Content CraftLead', image: '/images/divyamadhuri.jpg', hint: 'woman portrait' },
    ],
  },
  {
    phase: '2023 - 2024',
    title: 'The Ignition Phase',
    members: [
        { name: 'Palle Deepak', designation: 'President', image: '/images/palledeepak.jpg', hint: 'man portrait' },
        { name: 'Amoolya Chitteti', designation: 'Vice President', image: '/images/amoolyachitteti.jpg', hint: 'woman portrait' },
        { name: 'Manikanta K', designation: 'Secretary', image: '/images/manikantak.jpg', hint: 'man portrait' },
        { name: 'Gurpreet Singh', designation: 'Treasurer', image: '/images/gurpreetsingh.jpg', hint: 'man portrait' },
        { name: 'Anirudh G', designation: 'Project Lead', image: '/images/anirudhg.jpg', hint: 'man portrait' },
        { name: 'Abhishek J', designation: 'Joint Secretary', image: '/images/abhishekj.jpg', hint: 'man portrait' },
        { name: 'Tulasi Sharan', designation: 'Joint Secretary', image: '/images/tulasisharan.jpg', hint: 'man portrait' },
        { name: 'Karthik Pagidi', designation: 'Design lead', image: '/images/karthikpagidi.jpg', hint: 'man portrait' },
        { name: 'Sai Krishna', designation: 'Marketing', image: '/images/saikrishna2.jpg', hint: 'man portrait' },
        { name: 'Sampreeth', designation: 'Web Dev Lead', image: '/images/sampreeth.jpg', hint: 'man portrait' },
        { name: 'Showry James', designation: 'Content & Magazine', image: '/images/showryjames2.jpg', hint: 'man portrait' },
    ],
  },
  {
    phase: '2022 - 2023',
    title: 'The Founder Phase',
    members: [
        { name: 'P S Pranav', designation: 'Secretary', image: '/images/pspranav.jpg', hint: 'man portrait' },
        { name: 'Palle Deepak', designation: 'Joint Secretary', image: '/images/palledeepak2.jpg', hint: 'man portrait' },
        { name: 'Datta Praneeth', designation: 'Joint Secretary', image: '/images/dattapraneeth.jpg', hint: 'man portrait' },
        { name: 'Saketh Anand', designation: 'Project Lead', image: '/images/sakethanand.jpg', hint: 'man portrait' },
        { name: 'Sai Kumar', designation: 'Event Management', image: '/images/saikumar.jpg', hint: 'man portrait' },
        { name: 'Keerthi K', designation: 'Marketing Lead', image: '/images/keerthik.jpg', hint: 'woman portrait' },
        { name: 'V Sri Harsha', designation: 'Creative Design Lead', image: '/images/vsriharsha.jpg', hint: 'man portrait' },
        { name: 'D Varun sai', designation: 'Creative Design Lead', image: '/images/dvarunsai.jpg', hint: 'man portrait' },
        { name: 'M Sathvika', designation: 'Content & Magazine', image: '/images/msathvika.jpg', hint: 'woman portrait' },
        { name: 'Ravi Chandra', designation: 'Treasurer', image: '/images/ravichandra.jpg', hint: 'man portrait' },
        { name: 'Sreenija Pulta', designation: 'Content & Magazine', image: '/images/sreenijapulta.jpg', hint: 'woman portrait' },
    ],
  },
];

const boardPhases = ['2025 - 2026', '2024 - 2025', '2023 - 2024', '2022 - 2023'];

const lastMinuteTaglines = [
    "Every ending opens the door to a new beginning.",
    "Thank you to our leaders who guided us this far.",
    "Here’s to the memories we created together.",
    "Your efforts shaped today, your vision built tomorrow.",
    "With pride, we pass the torch to new hands.",
    "Welcoming fresh energy, ideas, and leadership!",
    "The Future is Now — Congratulations EB 2025–2026!",
    "A new journey starts, with brighter horizons ahead.",
];

const FinalMessage = () => (
    <div className="text-xs sm:text-sm text-muted-foreground whitespace-pre-wrap text-center">
        With gratitude, we bid farewell to EB 2024–2025 and warmly welcome EB 2025–2026.
        <br />
        Wishing you success, growth, and innovation ahead.
        <br /><br />
        Thank You and Best Regards,
        <br />
        Team G-Electra & Team Web Development
    </div>
);

const Countdown = ({ onFinished }: { onFinished: () => void }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [tagline, setTagline] = useState("The Future is Loading...");
    const [taglineOpacity, setTaglineOpacity] = useState(1);
    const [isLastMinute, setIsLastMinute] = useState(false);
    const taglineIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const revealDate = new Date('2025-09-15T09:00:00');

        const timer = setInterval(() => {
            const now = new Date();
            const difference = revealDate.getTime() - now.getTime();
            const totalSeconds = Math.floor(difference / 1000);

            if (totalSeconds > 0) {
                const days = Math.floor(totalSeconds / 86400);
                const hours = Math.floor((totalSeconds % 86400) / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;
                setTimeLeft({ days, hours, minutes, seconds });

                if (totalSeconds <= 60 && !isLastMinute) {
                    setIsLastMinute(true);
                }
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                clearInterval(timer);
                if (taglineIntervalRef.current) {
                    clearInterval(taglineIntervalRef.current);
                }
                onFinished();
            }
        }, 1000);
        
        return () => {
          clearInterval(timer);
          if (taglineIntervalRef.current) {
            clearInterval(taglineIntervalRef.current);
          }
        };
    }, [onFinished, isLastMinute]);

    useEffect(() => {
        if (isLastMinute) {
            let index = 0;
            const updateTagline = () => {
                setTaglineOpacity(0);
                setTimeout(() => {
                    if (index < lastMinuteTaglines.length) {
                        setTagline(lastMinuteTaglines[index]);
                        index++;
                    } else {
                         if(taglineIntervalRef.current) clearInterval(taglineIntervalRef.current);
                    }
                    setTaglineOpacity(1);
                }, 500); // fade in duration
            };

            updateTagline(); 
            taglineIntervalRef.current = setInterval(updateTagline, 6000);
        }
        return () => {
          if (taglineIntervalRef.current) {
            clearInterval(taglineIntervalRef.current);
          }
        };
    }, [isLastMinute]);


    return (
        <div className="text-center my-8">
            <div className="flex justify-center gap-2 sm:gap-4 my-8 font-headline">
                {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="text-center bg-secondary/50 p-3 sm:p-4 rounded-lg w-20 sm:w-24">
                        <div className="text-3xl sm:text-5xl font-bold text-primary">{String(value).padStart(2, '0')}</div>
                        <div className="text-xs sm:text-sm uppercase text-muted-foreground mt-1">{unit}</div>
                    </div>
                ))}
            </div>
             <div className="min-h-[60px] flex items-center justify-center">
                {timeLeft.minutes === 0 && timeLeft.seconds <= 6 ? (
                    <div 
                         className="transition-opacity duration-500 text-center font-sans text-sm text-primary/80"
                         style={{ opacity: taglineOpacity }}
                    >
                       <FinalMessage/>
                    </div>
                ) : (
                    <h3 
                        className="font-headline text-2xl sm:text-3xl text-primary min-h-[40px] transition-opacity duration-500"
                        style={{ opacity: taglineOpacity }}
                    >
                        {tagline}
                    </h3>
                )}
            </div>
        </div>
    );
};


export default function CommunityPage() {
  const [activePhase, setActivePhase] = useState(boardPhases[0]);
  const [isClient, setIsClient] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showSignOff, setShowSignOff] = useState(false);
  const [startSignOffAnimation, setStartSignOffAnimation] = useState(false);
  const [startBoardFadeIn, setStartBoardFadeIn] = useState(false);
  
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  
  useEffect(() => {
    // This ensures the component only renders the countdown logic on the client
    setIsClient(true);
    const checkDate = () => {
      const revealDate = new Date('2025-09-15T09:00:00');
      if (new Date() >= revealDate) {
        setIsRevealed(true);
        setStartBoardFadeIn(true);
      }
    }
    checkDate();
  }, []);

  useEffect(() => {
    const activeTabIndex = boardPhases.indexOf(activePhase);
    const activeTab = tabsRef.current[activeTabIndex];
    if (activeTab) {
      setIndicatorStyle({
        width: activeTab.offsetWidth,
        left: activeTab.offsetLeft,
      });
    }
  }, [activePhase]);

  const handleReveal = () => {
    setShowSignOff(true);
    
    setTimeout(() => {
      setStartSignOffAnimation(true);
    }, 100); 

    setTimeout(() => {
      setStartSignOffAnimation(false);
    }, 2500); 

    setTimeout(() => {
      setShowSignOff(false);
      setIsRevealed(true);
    }, 3000); 

    setTimeout(() => {
      setStartBoardFadeIn(true);
    }, 3100); 
  };
  
  const renderBoardContent = () => {
      if (!isClient) {
           return (
             <div className="min-h-[400px] flex items-center justify-center w-full">
                <Card className="text-center py-12 border-2 border-dashed border-muted-foreground/20 bg-card/50">
                    <p className="text-muted-foreground text-lg">Loading Board...</p>
                </Card>
            </div>
          )
      }

      if (activePhase === '2025 - 2026' && !isRevealed) {
           return (
              <Card className="text-center py-12 border-2 border-dashed border-muted-foreground/20 bg-card/50">
                  {showSignOff ? (
                       <div 
                          className={cn(
                              'text-center py-12 transition-all duration-500 ease-in-out',
                              startSignOffAnimation ? 'opacity-100 scale-110' : 'opacity-0 scale-90'
                          )}
                      >
                          <h2 className="font-headline text-4xl text-primary">Signing off EB 2024-2025...</h2>
                      </div>
                  ) : (
                      <>
                        <p className="text-muted-foreground mt-4 text-lg">The Executive Board for 2025-2026 will be revealed soon. Get ready to meet the next generation of innovators!</p>
                        <Countdown onFinished={handleReveal} />
                      </>
                  )}
              </Card>
          );
      }
      
      const boardToShow = executiveBoard.find(board => board.phase === activePhase);
      if (!boardToShow) return null;

      // Render the board members
      return (
          <div className={cn(
              'transition-opacity duration-1000 w-full',
              (boardToShow.phase === '2025 - 2026' && isRevealed && startBoardFadeIn) || boardToShow.phase !== '2025 - 2026' ? 'opacity-100' : 'opacity-0'
          )}>
              <h3 className="text-center font-headline text-2xl mb-12 text-primary">{boardToShow.title}</h3>
              <div className="flex flex-wrap justify-center gap-8">
                  {boardToShow.members.map(member => (
                      <Card key={member.name} className="text-center overflow-hidden group transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2 w-full max-w-[250px] sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1.5rem)] lg:max-w-[250px]">
                          <div className="relative h-48">
                              <Image src={member.image} alt={member.name} fill className="object-cover transition-all duration-300" data-ai-hint={member.hint} />
                          </div>
                          <CardHeader>
                              <CardTitle className="font-headline">{member.name}</CardTitle>
                              <p className="text-primary">{member.designation}</p>
                          </CardHeader>
                      </Card>
                  ))}
              </div>
          </div>
      );
  }

  return (
    <div className="container mx-auto py-16 sm:py-24 space-y-24">
      <div className="text-center">
        <h1 className="font-headline text-5xl font-bold tracking-tight">Our Team</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          The heart of G-ELECTRA is its people. Meet the teams and collaborators who make it all happen.
        </p>
      </div>

       <section>
            <h2 className="font-headline text-4xl font-bold text-center mb-12 flex items-center justify-center gap-4">
                <Star className="text-primary"/> Our Mentors
            </h2>
            <div className="flex justify-center gap-8 flex-wrap">
                {mentors.map(member => (
                    <Card key={member.name} className="text-center overflow-hidden group transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2 w-full max-w-[250px] sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1.5rem)] lg:max-w-[250px]">
                    <div className="relative h-48">
                        <Image src={member.image} alt={member.name} fill className="object-cover transition-all duration-300" data-ai-hint={member.hint} />
                    </div>
                    <CardHeader>
                        <CardTitle className="font-headline">{member.name}</CardTitle>
                        <p className="text-primary">{member.designation}</p>
                    </CardHeader>
                    </Card>
                ))}
            </div>
        </section>

      <section>
          <h2 className="font-headline text-4xl font-bold text-center mb-12 flex items-center justify-center gap-4">
              <Users className="text-primary"/> Executive Board
          </h2>
          
          <div className="flex justify-center mb-12">
            <div className="relative flex flex-wrap justify-center gap-2 rounded-lg bg-secondary/50 p-1.5 border border-border">
                {boardPhases.map((phase, index) => (
                    <button
                        ref={(el) => (tabsRef.current[index] = el)}
                        key={phase}
                        onClick={() => setActivePhase(phase)}
                        className={cn(
                            'relative z-10 rounded-md px-4 sm:px-6 py-2 text-sm font-medium transition-colors',
                            activePhase === phase ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                        )}
                    >
                        {phase}
                    </button>
                ))}
                <div 
                    className="absolute top-1.5 bottom-1.5 z-0 rounded-md bg-primary shadow-lg shadow-primary/40 transition-all duration-300 ease-in-out"
                    style={indicatorStyle}
                ></div>
            </div>
          </div>
          
          <div className="min-h-[400px] flex items-center justify-center">
            {renderBoardContent()}
          </div>
          
      </section>
    </div>
  );
}
