"use client"
import Link from "next/link";
import Image from "next/image";
import {
  BarChart2,
  GitPullRequest,
  MessageSquare,
  Users,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Track Your Team's Pulse, Not Just Their Tasks
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    PulseCheck transforms your team's activity data into
                    actionable insights. Spot burnout, celebrate collaboration,
                    and build healthier tech teams.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/sign-up"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-purple-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
                  <img
                    src="https://res.cloudinary.com/diytun95m/image/upload/f_auto,q_auto/wc8io78qc0gmixz6bu1q"
                    alt="PulseCheck Dashboard"
                    fill
                    className="object-contain rounded-lg shadow-xl"
                    priority
                  />
                  <div className="absolute left-0 top-0 h-full w-1/4 bg-gradient-to-r from-black to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-600 dark:bg-purple-800/30 dark:text-purple-400">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything You Need to Track Team Health
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  PulseCheck gives you a complete view of your team's activity
                  and collaboration patterns.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-start space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-800/30 dark:text-purple-400">
                  <GitPullRequest className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">GitHub Integration</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Track commits, PRs, and code reviews to understand
                    development patterns.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-800/30 dark:text-purple-400">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Slack Analytics</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Analyze communication patterns to identify collaboration
                    trends.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-800/30 dark:text-purple-400">
                  <BarChart2 className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    Intuitive Visualizations
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    See team activity trends with beautiful, easy-to-understand
                    charts.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-800/30 dark:text-purple-400">
                  <Users className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    Team & Individual Insights
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    View metrics at both team and individual levels to spot
                    patterns.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-800/30 dark:text-purple-400">
                  <Zap className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Early Warning System</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Get alerts for burnout risks, disengagement, or
                    collaboration issues.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-800/30 dark:text-purple-400">
                  <BarChart2 className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Custom Reports</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Generate detailed reports on team health metrics for
                    stakeholders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Your Team's Pulse at a Glance
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  PulseCheck's intuitive dashboard gives you immediate insights
                  into your team's health.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <div className="rounded-lg bg-background shadow-xl">
                <div className="p-1">
                  <div className="relative w-full h-[300px] md:h-[500px]">
                  <video
                  loop
                  autoPlay
                  muted
        width="100%"
        className="rounded-lg shadow-lg"
      >
        <source src="https://res.cloudinary.com/diytun95m/video/upload/f_auto:video,q_auto/mbndwhot1s0mxsg4n4gc" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-600 dark:bg-purple-800/30 dark:text-purple-400">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Simple Setup, Powerful Insights
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Get started with PulseCheck in just a few minutes.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-800/30 dark:text-purple-400">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Connect Your Tools</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Integrate with GitHub, Slack, and other tools with just a
                    few clicks.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-800/30 dark:text-purple-400">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    Customize Your Dashboard
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Select the metrics and visualizations that matter most to
                    your team.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-800/30 dark:text-purple-400">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Gain Insights</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Start receiving actionable insights about your team's health
                    and collaboration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-600 dark:bg-purple-800/30 dark:text-purple-400">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Trusted by Engineering Leaders
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  See what engineering managers and team leads are saying about
                  PulseCheck.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <p className="text-gray-500 dark:text-gray-400">
                    "PulseCheck helped us identify burnout risks before they
                    became problems. It's now an essential part of our team
                    management toolkit."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-100 p-1">
                    <div className="h-10 w-10 rounded-full bg-gray-200" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sarah Johnson</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Engineering Manager, TechCorp
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <p className="text-gray-500 dark:text-gray-400">
                    "The visualizations make it easy to spot collaboration
                    patterns. We've improved our team structure based on these
                    insights."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-100 p-1">
                    <div className="h-10 w-10 rounded-full bg-gray-200" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Michael Chen</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      CTO, StartupX
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <p className="text-gray-500 dark:text-gray-400">
                    "PulseCheck gives us the data we need to make informed
                    decisions about team health and workload distribution."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-100 p-1">
                    <div className="h-10 w-10 rounded-full bg-gray-200" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Emily Rodriguez</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      VP of Engineering, GrowthCo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-600 dark:bg-purple-800/30 dark:text-purple-400">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Simple, Transparent Pricing
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Choose the plan that's right for your team.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Starter</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    For small teams just getting started.
                  </p>
                </div>
                <div className="mt-4 flex items-baseline text-3xl font-bold">
                  $0
                  <span className="ml-1 text-base font-medium text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <ul className="mt-6 space-y-4 text-sm">
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Up to 5 team members
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Basic analytics
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    GitHub integration
                  </li>
                  <li className="flex items-center text-gray-500">
                    <svg
                      className="mr-2 h-4 w-4 text-gray-400"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                    Slack integration
                  </li>
                </ul>
                <div className="mt-6">
                  <Link
                    href="/sign-up"
                    className="inline-flex h-10 w-full items-center justify-center rounded-md bg-purple-600 px-4 text-sm font-medium text-white shadow transition-colors hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm ring-2 ring-purple-600">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    For growing teams that need more insights.
                  </p>
                </div>
                <div className="mt-4 flex items-baseline text-3xl font-bold">
                  $29
                  <span className="ml-1 text-base font-medium text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <ul className="mt-6 space-y-4 text-sm">
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Up to 15 team members
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    GitHub integration
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Slack integration
                  </li>
                </ul>
                <div className="mt-6">
                  <Link
                    href="/sign-up"
                    className="inline-flex h-10 w-full items-center justify-center rounded-md bg-purple-600 px-4 text-sm font-medium text-white shadow transition-colors hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    For large teams with complex needs.
                  </p>
                </div>
                <div className="mt-4 flex items-baseline text-3xl font-bold">
                  $99
                  <span className="ml-1 text-base font-medium text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <ul className="mt-6 space-y-4 text-sm">
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Unlimited team members
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Premium analytics
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    All integrations
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Dedicated support
                  </li>
                </ul>
                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="inline-flex h-10 w-full items-center justify-center rounded-md bg-purple-600 px-4 text-sm font-medium text-white shadow transition-colors hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Transform Your Team's Health?
                </h2>
                <p className="max-w-[900px] text-purple-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of engineering teams already using PulseCheck
                  to build healthier, more productive teams.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="/sign-up"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-purple-600 shadow transition-colors hover:bg-purple-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Request Demo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-purple-600" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 PulseCheck. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
            <Link
              href="https://linkedin.com/in/sri-harsha-simha"
              className="hover:underline"
            >
              Designed and Developed by Simha
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
