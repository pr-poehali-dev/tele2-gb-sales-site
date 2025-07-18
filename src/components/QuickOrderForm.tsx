import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { toast } from "@/components/ui/use-toast";

interface QuickOrderFormProps {
  preSelectedPackage?: string;
  onClose?: () => void;
}

const QuickOrderForm: React.FC<QuickOrderFormProps> = ({ preSelectedPackage, onClose }) => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    package: preSelectedPackage || '',
    paymentMethod: '',
    email: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const packages = [
    { id: 'basic', name: 'Начальный', gb: '1', price: 50 },
    { id: 'popular', name: 'Популярный', gb: '5', price: 200, popular: true },
    { id: 'premium', name: 'Максимальный', gb: '10', price: 350 }
  ];

  const paymentMethods = [
    { id: 'card', name: 'Банковская карта', icon: 'CreditCard' },
    { id: 'yandex', name: 'Яндекс.Деньги', icon: 'Wallet' },
    { id: 'qiwi', name: 'QIWI', icon: 'Smartphone' },
    { id: 'webmoney', name: 'WebMoney', icon: 'Globe' },
    { id: 'paypal', name: 'PayPal', icon: 'DollarSign' },
    { id: 'apple', name: 'Apple Pay', icon: 'Zap' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Валидация номера телефона
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Введите номер телефона';
    } else if (!/^(\+7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Неверный формат номера телефона';
    }

    // Валидация пакета
    if (!formData.package) {
      newErrors.package = 'Выберите пакет гигабайт';
    }

    // Валидация способа оплаты
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Выберите способ оплаты';
    }

    // Валидация email
    if (!formData.email) {
      newErrors.email = 'Введите email для получения чека';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Симуляция отправки заказа
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const selectedPackage = packages.find(p => p.id === formData.package);
      const selectedPayment = paymentMethods.find(p => p.id === formData.paymentMethod);
      
      toast({
        title: "Заказ оформлен!",
        description: `Пакет ${selectedPackage?.name} (${selectedPackage?.gb} ГБ) за ${selectedPackage?.price}₽. Способ оплаты: ${selectedPayment?.name}`,
      });

      // Сброс формы
      setFormData({
        phoneNumber: '',
        package: preSelectedPackage || '',
        paymentMethod: '',
        email: ''
      });
      
      if (onClose) {
        onClose();
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось оформить заказ. Попробуйте еще раз.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPackage = packages.find(p => p.id === formData.package);
  const selectedPayment = paymentMethods.find(p => p.id === formData.paymentMethod);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Icon name="Zap" size={24} className="text-[#FF6B35] mr-2" />
          Быстрый заказ
        </CardTitle>
        <CardDescription>
          Оформите заказ за несколько минут и получите гигабайты мгновенно
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Номер телефона */}
          <div>
            <Label htmlFor="phoneNumber">Номер телефона *</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+7 (999) 123-45-67"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className={errors.phoneNumber ? 'border-red-500' : ''}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Выбор пакета */}
          <div>
            <Label>Выберите пакет *</Label>
            <div className="grid md:grid-cols-3 gap-4 mt-3">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                    formData.package === pkg.id
                      ? 'border-[#FF6B35] bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setFormData({ ...formData, package: pkg.id })}
                >
                  {pkg.popular && (
                    <Badge className="absolute -top-2 -right-2 bg-[#FF6B35] text-white">
                      Популярный
                    </Badge>
                  )}
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{pkg.name}</h3>
                    <div className="text-2xl font-bold text-[#FF6B35] my-2">
                      {pkg.gb} ГБ
                    </div>
                    <div className="text-xl font-bold">
                      {pkg.price}₽
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {errors.package && (
              <p className="text-red-500 text-sm mt-1">{errors.package}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email для чека *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Способ оплаты */}
          <div>
            <Label>Способ оплаты *</Label>
            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
              className="grid md:grid-cols-2 gap-4 mt-3"
            >
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Label 
                    htmlFor={method.id} 
                    className="flex items-center cursor-pointer flex-1 p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <Icon name={method.icon} size={20} className="text-[#2563EB] mr-2" />
                    {method.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>
            )}
          </div>

          {/* Итоговая информация */}
          {selectedPackage && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Итоговая информация:</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Пакет:</span>
                  <span className="font-medium">{selectedPackage.name} ({selectedPackage.gb} ГБ)</span>
                </div>
                <div className="flex justify-between">
                  <span>Номер телефона:</span>
                  <span className="font-medium">{formData.phoneNumber || '—'}</span>
                </div>
                {selectedPayment && (
                  <div className="flex justify-between">
                    <span>Способ оплаты:</span>
                    <span className="font-medium">{selectedPayment.name}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>К оплате:</span>
                  <span className="text-[#FF6B35]">{selectedPackage.price}₽</span>
                </div>
              </div>
            </div>
          )}

          {/* Кнопки */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#FF6B35] hover:bg-[#e55a2b] text-white"
            >
              {isSubmitting ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Оформляю заказ...
                </>
              ) : (
                <>
                  <Icon name="CreditCard" size={16} className="mr-2" />
                  Оплатить {selectedPackage?.price}₽
                </>
              )}
            </Button>
            {onClose && (
              <Button type="button" variant="outline" onClick={onClose}>
                Отмена
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuickOrderForm;