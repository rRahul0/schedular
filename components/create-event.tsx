"use cient";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useSearchParams, useRouter } from 'next/navigation';
import EventForm from './event-form';
const data = [
    {
        goal: 400,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 278,
    },
    {
        goal: 189,
    },
    {
        goal: 239,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 278,
    },
    {
        goal: 189,
    },
    {
        goal: 349,
    },
]
const CreateEventDrawer: React.FC = () => {
    const [open, setOpen] = useState(false)
    const [goal, setGoal] = useState(350)
    const router = useRouter();
    const searchParams = useSearchParams();
    useEffect(() => {
        const create = searchParams.get("create");
        if (create === "true") setOpen(true);
    }, [searchParams]);
    function onClick(adjustment: number) {
        setGoal(Math.max(200, Math.min(400, goal + adjustment)))
    }
    const handleClose = () => {
        setOpen(false);
        if (searchParams.get("create") === "true") router.replace(window?.location?.pathname);
    }
    return (
        <Drawer open={open} onClose={handleClose}>
            <DrawerTrigger asChild>
                <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Create New Event</DrawerTitle>
                    </DrawerHeader>
                    <EventForm onSubmitForm={handleClose} />    
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline" onClick={handleClose}>Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default CreateEventDrawer;