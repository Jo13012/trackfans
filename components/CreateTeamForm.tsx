"use client"

import * as z from "zod";
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react';
import { createTeam } from "@/lib/create-team";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { auth } from "@clerk/nextjs/server";
import { formSchema } from "@/app/(dashboard)/(routes)/teams/constants";
import { Input } from "./ui/input";

const CreateTeamForm = () => {
    const [isLoading, setIsLoading] = useState(false); // État pour le chargement

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          teamName: ""
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            await createTeam(values.teamName);
        } catch (error) {
            console.error("Error creating team:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormItem>
                <Controller
                        name="teamName"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-12 lg:col-span-10">
                                <FormControl className="m-0 p-0">
                                    <Input
                                        className="
                                            border-0 
                                            outline-none 
                                            focus-visible:ring-0 
                                            focus-visible:ring-transparent"
                                        disabled={isLoading}
                                        placeholder="Créer votre équipe"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </FormItem>
                <Button
                        className="col-span-12 lg:col-span-2 w-full"
                        type="submit"
                        disabled={isLoading}
                    />
            </form>
        </FormProvider>
    );
}

export default CreateTeamForm;
