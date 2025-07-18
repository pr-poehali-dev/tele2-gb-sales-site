import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/toaster";
import QuickOrderForm from "@/components/QuickOrderForm";
import { useState } from "react";

const Index = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');

  const packages = [
    {
      id: "basic",
      name: "Начальный",
      gb: "1",
      price: "50",
      features: ["Высокая скорость", "Без ограничений", "Мгновенная активация"]
    },
    {
      id: "popular",
      name: "Популярный",
      gb: "5",
      price: "200",
      features: ["Лучшая цена", "Экономия 20%", "Приоритетная поддержка"],
      popular: true
    },
    {
      id: "premium",
      name: "Максимальный",
      gb: "10",
      price: "350",
      features: ["Максимальный объем", "VIP поддержка", "Бонусные гигабайты"]
    }
  ];

  const handleOrderClick = (packageId: string) => {
    setSelectedPackageId(packageId);
    setIsOrderModalOpen(true);
  };

  const paymentMethods = [
    { name: "Банковская карта", icon: "CreditCard", description: "Visa, MasterCard, МИР" },
    { name: "Яндекс.Деньги", icon: "Wallet", description: "Быстрая оплата" },
    { name: "QIWI", icon: "Smartphone", description: "Мгновенный перевод" },
    { name: "WebMoney", icon: "Globe", description: "Безопасные платежи" },
    { name: "PayPal", icon: "DollarSign", description: "Международные платежи" },
    { name: "Apple Pay", icon: "Zap", description: "Оплата одним касанием" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-[#FF6B35]">TELE2</div>
              <Badge variant="secondary" className="bg-[#2563EB] text-white">Gigbyte</Badge>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-[#FF6B35] transition-colors">Главная</a>
              <a href="#packages" className="text-gray-700 hover:text-[#FF6B35] transition-colors">Купить ГБ</a>
              <a href="#contacts" className="text-gray-700 hover:text-[#FF6B35] transition-colors">Контакты</a>
              <a href="#support" className="text-gray-700 hover:text-[#FF6B35] transition-colors">Поддержка</a>
            </nav>
            <Button className="bg-[#FF6B35] hover:bg-[#e55a2b] text-white">
              <Icon name="ShoppingCart" size={16} className="mr-2" />
              Корзина
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#FF6B35] to-[#2563EB] text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Купи гигабайты <span className="text-yellow-300">TELE2</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in">
              Быстро, удобно, выгодно! Пополни интернет-трафик за пару кликов
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-[#FF6B35] hover:bg-gray-100 hover-scale">
                    Купить сейчас
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Быстрый заказ гигабайт</DialogTitle>
                  </DialogHeader>
                  <QuickOrderForm 
                    preSelectedPackage={selectedPackageId}
                    onClose={() => setIsOrderModalOpen(false)}
                  />
                </DialogContent>
              </Dialog>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div id="packages" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Выберите пакет гигабайт
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Мгновенное пополнение интернет-трафика по лучшим ценам
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative border-0 shadow-lg hover:shadow-xl transition-all hover-scale ${
                pkg.popular ? 'ring-2 ring-[#FF6B35] bg-white' : 'bg-white'
              }`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#FF6B35] text-white px-4 py-1">
                      Популярный
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900">{pkg.name}</CardTitle>
                  <div className="text-5xl font-bold text-[#FF6B35] my-4">
                    {pkg.gb}<span className="text-lg text-gray-600">ГБ</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">
                    {pkg.price}<span className="text-lg text-gray-600">₽</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-center">
                      <Icon name="Check" size={16} className="text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  <Button 
                    className={`w-full mt-6 ${
                      pkg.popular 
                        ? 'bg-[#FF6B35] hover:bg-[#e55a2b] text-white' 
                        : 'bg-[#2563EB] hover:bg-[#1e40af] text-white'
                    }`}
                    onClick={() => handleOrderClick(pkg.id)}
                  >
                    Купить пакет
                    <Icon name="ShoppingCart" size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Способы оплаты
            </h2>
            <p className="text-xl text-gray-600">
              Выберите удобный способ оплаты из множества доступных вариантов
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {paymentMethods.map((method, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow hover-scale cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Icon name={method.icon} size={32} className="text-[#2563EB] mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">{method.name}</h3>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Contact & Support */}
      <div id="contacts" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Контакты</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Icon name="Phone" size={20} className="text-[#FF6B35] mr-3" />
                  <span className="text-gray-700">8-800-555-0611</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Mail" size={20} className="text-[#FF6B35] mr-3" />
                  <span className="text-gray-700">support@tele2gb.ru</span>
                </div>
                <div className="flex items-center">
                  <Icon name="MapPin" size={20} className="text-[#FF6B35] mr-3" />
                  <span className="text-gray-700">Москва, ул. Тверская, д. 1</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Clock" size={20} className="text-[#FF6B35] mr-3" />
                  <span className="text-gray-700">Круглосуточно</span>
                </div>
              </div>
            </div>

            <div id="support">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Поддержка</h2>
              <div className="space-y-4">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <Icon name="MessageCircle" size={20} className="text-[#2563EB] mr-3" />
                      <h3 className="font-semibold">Онлайн-чат</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Получите мгновенную помощь от наших специалистов</p>
                    <Button className="bg-[#2563EB] hover:bg-[#1e40af] text-white">
                      Открыть чат
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <Icon name="HelpCircle" size={20} className="text-[#2563EB] mr-3" />
                      <h3 className="font-semibold">База знаний</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Ответы на часто задаваемые вопросы</p>
                    <Button variant="outline" className="border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white">
                      Перейти к FAQ
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1F2937] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="text-2xl font-bold text-[#FF6B35]">TELE2</div>
              <Badge variant="secondary" className="bg-[#2563EB] text-white">Gigbyte</Badge>
            </div>
            <p className="text-gray-400 mb-6">Быстрая покупка гигабайт для вашего мобильного интернета</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
                <Icon name="Facebook" size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
                <Icon name="Twitter" size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
                <Icon name="Instagram" size={24} />
              </a>
            </div>
            <Separator className="my-6 bg-gray-700" />
            <p className="text-sm text-gray-400">
              © 2024 TELE2 Gigbyte. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Index;