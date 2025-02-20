"use client"
import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({setIsSetupComplete}:{setIsSetupComplete:(value: boolean) => void}) => {
    const[isMicCameToggledOn  , setIsMicCamToggledOn] = useState(false);
    const call = useCall();
    if(!call){
        throw new Error('usecall must be used within StreamCall components')
    }
    useEffect(() => {
        if(isMicCameToggledOn){
            call?.camera.disable();
            call?.microphone.disable();
        }
        else{
            call?.camera.enable();
            call?.microphone.enable();
        }

    }, [isMicCameToggledOn ,call?.camera,call?.microphone])
  return (
    <div className=' flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
        <h1 className='text-2xl font-bold ' >Setup</h1>
        <VideoPreview/>
        <div className='felx h-16 items-center justify-center gap-3'>
            <label className='flex items-center justify-center gap-2 font-medium'>
                <input
                    type='checkbox'
                    checked={isMicCameToggledOn}
                    onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
                />
                Join with mic and camera off
            </label>

            <DeviceSettings/>
        </div>
        <Button className='rounded-md bg-green-500 px-4 py-2.5' onClick={() => {
            call.join();
            setIsSetupComplete(true);
        }}>
            Join meeting
        </Button>
    </div>
  )
}

export default MeetingSetup