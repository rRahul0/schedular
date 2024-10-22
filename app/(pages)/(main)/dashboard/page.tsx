"use client"

import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameschema } from "@/lib/validator";




const Dashboard: React.FC = () => {
    const { isLoaded, user } = useUser();
    console.log(user);
    const { register, handleSubmit, setValue, formState:{errors} } = useForm({
        resolver: zodResolver(usernameschema),
    })
    const onSubmit = async (data) => { }
    useEffect(() => {
        setValue("username", user?.username)
    }, [isLoaded]);
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome, {user?.firstName}</CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Your Unique Link</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                        <div>
                            <div className="flex items-center gap-2 ">
                                <span>{window?.location.origin}</span>
                                <Input {...register("username")} placeholder="username" />
                            </div>
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1">{errors.username?.message?.toString()}</p>
                            )}
                        </div>
                        <Button type="submit">Update Username</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
export default Dashboard;