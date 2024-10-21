"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Autoplay from "embla-carousel-autoplay";
import { testimonials } from "@/constants/index";



const TestimonialsCarousel = () => {
    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 2000,
                }),
            ]}
            className="w-full mx-auto">
            <CarouselContent>
                {testimonials.map((item, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <Card className="h-full">
                            <CardContent className="flex flex-col justify-between h-full p-6">
                                <p className="text-gray-600 mb-4">
                                    &quot;{item.content}&quot;
                                </p>
                                <div className="flex items-center mt-4">
                                    <Avatar className="h-12 w-12 mr-4 ">
                                        <AvatarImage src={item.image} alt={item.name} />
                                        <AvatarFallback>{item.name.split(' ').map((n) => n[0]).join("")}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-gray-500">{item.role}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
};

export default TestimonialsCarousel;