import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { MdFoodBank } from "react-icons/md";
import { FaDumbbell } from "react-icons/fa";
import { TbChartBar } from "react-icons/tb";
import { SiGooglegemini } from "react-icons/si";

export const Features = () => {
  return (
    <div className="md:mx-20 grid gap-5 md:grid-cols-4">
      {/* Workout Tracking */}
      <Card>
        <CardHeader>
          <FaDumbbell size={40} />
          <h3 className="font-bold text-xl">Track Your Workouts</h3>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm font-semibold">
          <p>Create and customize your own workout plans.</p>
          <p>Access preset workout sheets and import them seamlessly.</p>
          <p className="text-primary">Premium users can generate AI-based workout plans (5 min cooldown).</p>
        </CardContent>
      </Card>

      {/* Nutrition Guide */}
      <Card>
        <CardHeader>
          <MdFoodBank size={40} />
          <h3 className="font-bold text-xl">Nutrition Guide</h3>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm font-semibold">
          <p>Check your daily macronutrient recommendations.</p>
          <p>Calculate TDEE, BMI, and track your monthly weight average.</p>
          <p className="text-primary">Premium users can generate AI-based meal plans (1-hour cooldown).</p>
        </CardContent>
      </Card>

      {/* AI Chatbot (Premium Only) */}
      <Card className="border-primary">
        <CardHeader>
          <SiGooglegemini size={40} />
          <h3 className="font-bold text-xl">AI Chatbot (Premium)</h3>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm font-semibold">
          <p>Premium users can chat with ReptrackerAI for fitness and nutrition guidance.</p>
          <p>AI provides insights based on your personal workout and nutrition data.</p>
          <p>Save chat history for future reference.</p>
        </CardContent>
      </Card>

      {/* Dashboard & Insights */}
      <Card>
        <CardHeader>
          <TbChartBar size={40} />
          <h3 className="font-bold text-xl">Dashboard & Insights</h3>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm font-semibold">
          <p>Track your TDEE and overall fitness progress.</p>
          <p>Monitor your monthly weight trends.</p>
          <p>Calculate and analyze your BMI.</p>
        </CardContent>
      </Card>
    </div>
  );
};