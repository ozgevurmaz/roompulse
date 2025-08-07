"use client"

import React, { useState, useEffect, useRef, use } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import ProgressBar from '../ui/progressBar';
import { formatSeconds } from '@/lib/utils';

const PomodoroTimer = (
  {
    setIsBreak,
    isBreak,
    isRoomCaptain
  }
    : {
      setIsBreak: (val: boolean) => void,
      isBreak: boolean,
      isRoomCaptain: boolean
    }
) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer finished
      setIsActive(false);
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? 25 * 60 : 5 * 60);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, isBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
  };

  return (
    <Card className="w-full h-full relative overflow-hidden items-center gap-2">
      <CardHeader className='w-full px-4'>
        <CardTitle className={`font-medium px-4 py-2 rounded-sm w-full
        ${isBreak
            ?
            'bg-secondary text-secondary-foreground'
            :
            'bg-primary text-primary-foreground'
          }
          `
        }>
          {
            isBreak
              ?
              <p className='flex items-center gap-3 justify-center w-full'>
                <Coffee />Break Time
              </p>
              :
              <p className='flex items-center gap-3 justify-center w-full'>
                <Brain /> Focus Time
              </p>
          }
        </CardTitle>
      </CardHeader>
      <CardContent className='items-center gap-2 pb-4'>
        <div className={`text-6xl font-mono font-bold`}>
          {formatSeconds(timeLeft)}
        </div>

        <div className="relative flex gap-4 min-w-full">
          <Button
            onClick={toggleTimer}
            color={`${isBreak ? "secondary" : "primary"}`}
            className='py-2 px-4'
            disabled={!isRoomCaptain}
          >
            {
              isActive
                ?
                <Pause size={20} className='mr-2' />
                :
                <Play size={20} className='mr-2' />
            }
            {isActive ? 'Pause' : 'Start'}
          </Button>

          <Button
            onClick={resetTimer}
            color='none'
            className='py-2 px-4'
            disabled={!isRoomCaptain}
          >
            <RotateCcw size={20} className='mr-2' />
            Reset
          </Button>
        </div>

        <div className="text-xs text-foreground/70">
          <p>25 min work • 5 min break</p>
        </div>


      </CardContent>
      <div className="w-full h-2 absolute bottom-0 left-0">
        <ProgressBar
          color={isBreak ? 'bg-secondary-dark' : 'bg-primary-dark'}
          percentage={`${((isBreak ? 5 * 60 : 25 * 60) - timeLeft) / (isBreak ? 5 * 60 : 25 * 60) * 100}`}
        />
      </div>
    </Card>

  );
};

export default PomodoroTimer;