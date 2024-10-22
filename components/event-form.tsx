import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, ControllerFieldState, ControllerRenderProps, FieldValues, useForm, UseFormStateReturn } from 'react-hook-form';
import { eventSchema } from '@/lib/validator';
import { z } from 'zod';
import { Input } from './ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from './ui/button';


type EventFormData = z.infer<typeof eventSchema>;

interface EventFormProps {
    onSubmitForm: (data: EventFormData) => void;
    initialData?: Partial<EventFormData>;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmitForm, initialData = {} }) => {
    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<EventFormData>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: initialData.title || "",
            description: initialData.description || "",
            duration: initialData.duration || 30,
            isPrivate: initialData.isPrivate ?? true,
        }
    });


    return (
        <form className='px-6 flex flex-col gap-4'>
            <div>
                <label htmlFor="title" className='block text-sm font-medium text-gray-700'>Event Title</label>
                <Input {...register("title")} type='text' id='title' placeholder='Event Title' className='mt-1' />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>
            <div>
                <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Event Description</label>
                <Input {...register("description")} type='text' id='description' placeholder='Event Description' className='mt-1' />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>
            <div>
                <label htmlFor="duration" className='block text-sm font-medium text-gray-700'>Duration (minutes)</label>
                <Input {...register("duration", { valueAsNumber: true })} type='number' id='duration' placeholder='Event Duration' className='mt-1' />
                {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
            </div>
            <div>
                <label htmlFor="isPrivate" className='block text-sm font-medium text-gray-700'>Event Privacy</label>
                <Controller
                    name='isPrivate'
                    control={control}
                    render={({ field }) => (
                        <Select
                            value={field.value ? "true" : "false"}
                            onValueChange={(value) => field.onChange(value === "true")}
                        >
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select Privacy" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Private</SelectItem>
                                <SelectItem value="false">Public</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.isPrivate && <p className="text-red-500 text-sm mt-1">{errors.isPrivate.message}</p>}
            </div>
            <Button type='submit'>Create Event</Button>
        </form>
    );
};

export default EventForm;
