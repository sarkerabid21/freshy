// import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Star, Shield } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const features = [
  {
    title: "Quality Products",
    description: "Only the best products, verified and trusted.",
    icon: <ShoppingBag className="w-8 h-8 text-amber-500" />,
  },
  {
    title: "Customer Reviews",
    description: "Real reviews from real buyers to help you choose.",
    icon: <Star className="w-8 h-8 text-amber-500" />,
  },
  {
    title: "Secure Shopping",
    description: "Safe payment and trusted transactions guaranteed.",
    icon: <Shield className="w-8 h-8 text-amber-500" />,
  },
];

export default function ProductHighlights() {
  return (
    <section className="bg-amber-100 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Why Choose Our Products?
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          We make sure you get the best experience while shopping with us.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="shadow-md hover:shadow-xl transition rounded-2xl"
            >
              <CardContent className="flex flex-col items-center p-6">
                {feature.icon}
                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
