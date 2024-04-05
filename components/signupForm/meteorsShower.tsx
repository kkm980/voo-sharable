import React from "react";
import { Meteors } from "../ui/meteors";
import Form from "./Form";

export function MeteorsDemo() {
    return (
        <div className="">
            <div className=" w-full relative max-w-auto">
                <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">

                    <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                        Welcome to Aceternity
                    </h2>
                    <p className="text-neutral-600 text-sm max-w-sm mt-1 dark:text-neutral-300 mb-2">
                        Login to aceternity if you can because we don&apos;t have a login flow
                        yet
                    </p>
                    <Form />
                    {/* Meaty part - Meteor effect */}
                    <Meteors number={10} />
                </div>
            </div>
        </div>
    );
}
