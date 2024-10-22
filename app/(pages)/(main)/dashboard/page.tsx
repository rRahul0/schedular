"use client"

import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameschema } from "@/lib/validator";
import useFetch from "@/hooks/use-fetch";

import { updateUserName } from "@/actions/user";
import { BarLoader } from "react-spinners";



const Dashboard: React.FC = () => {
    const { isLoaded, user } = useUser();
    console.log(user);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(usernameschema),
    })
    useEffect(() => {
        setValue("username", user?.username);
    }, [isLoaded]);
    const { loading, error, data, fn: fnUpdateUsername } = useFetch(updateUserName);
    console.log("dashboard", error, data, loading);
    const onSubmit = async (data: any) => {
        // console.log("dashboard", data);
        await fnUpdateUsername(data.username);
    }

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
                            {/* {error?.message && <p className="text-red-500 text-sm mt-1">{error.message.toString()</p>} */}
                        </div>
                        {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
                        <Button type="submit">Update Username</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
export default Dashboard;