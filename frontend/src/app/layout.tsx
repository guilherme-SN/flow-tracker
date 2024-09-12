import type { Metadata } from "next";

import { Button } from "@/components/ui/button";

import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Slider } from "@/components/ui/slider";

import { Input } from "@/components/ui/input";

import Image from "next/image";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FlowTracker",
  description: "An implementation of a timer that uses the Flow Time method",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="flex flex-row justify-between">
          <h1 className="font-bold">FlowTracker</h1>
          <div className="flex flex-row justify-between items-center gap-x-20">
            {/* Help Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-full" variant="ghost" size="icon">
                  <Image
                    src="icons/help-circle.svg"
                    alt="Help Icon"
                    width={40}
                    height={40}
                  />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-100">
                <div className="flex flex-col">
                  <h2>Flow Time</h2>
                  <p>
                    The <b>Flow Time Method</b> is a time management technique
                    that aims to maximize <b>productivity</b> by respecting
                    natural periods of high <b>concentration</b>, known as{" "}
                    <b>flow</b>. The Flow Time method allows for{" "}
                    <b>uninterrupted</b> work periods until focus{" "}
                    <b>decreases</b>. Breaks are taken <b>naturally</b> and{" "}
                    <b>flexibly</b>, according to individual needs.{" "}
                  </p>

                  <h2 className="mt-5">How To Use</h2>
                  <p>
                    Start the timer and <b>study</b> until you notice your focus
                    has <b>decreased</b>. Press the “<b>stop</b>” button to end
                    the <b>focus session</b> and enter <b>break mode</b>. In
                    break mode, press “<b>start</b>” to begin the break timer.
                  </p>
                  <Button className="font-medium mt-10">
                    <Image
                      className="mr-2"
                      src="icons/github.svg"
                      alt="Github Icon"
                      width={22}
                      height={22}
                    />
                    Source Code
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Settings Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-full" variant="ghost" size="icon">
                  <Image
                    src="icons/settings.svg"
                    alt="Settings Icon"
                    width={40}
                    height={40}
                  />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-100">
                <DialogHeader>
                  <DialogTitle className="text-4xl">Settings</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col">
                  <h2>General</h2>
                  <h3 className="text-xl">Alarm Sound</h3>
                  <p className="text-sm mt-0">
                    The sound that goes off when the timer finishes.
                  </p>
                  <Select>
                    <SelectTrigger className="w-100 h-[40px] my-1 border-slate-300">
                      <SelectValue placeholder="Classical" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="classical">Classical</SelectItem>
                        <SelectItem value="sound1">Sound1</SelectItem>
                        <SelectItem value="sound2">Sound2</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <h3 className="text-xl mt-3">Volume</h3>
                  <p className="text-sm mt-0">Current Volume: 50%</p>
                  <Slider
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                  <h2 className="mt-10">FlowTime</h2>
                  <h3 className="text-xl">Break Time Multiplier</h3>
                  <p className="text-sm mt-0">
                    The value used to multiply the focus time to determine the
                    break time (Default: 0.2).
                  </p>
                  <Input
                    type="number"
                    placeholder="0.2"
                    step="0.2"
                    min="0"
                    className="border-slate-300 my-1"
                  />
                  <DialogClose asChild>
                    <Button type="button" className="mt-5">Save</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
