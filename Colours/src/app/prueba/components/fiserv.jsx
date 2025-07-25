import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Lock,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";

const FiservPaymentComponent = () => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
    amount: "",
    currency: "USD",
  });

  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const FISERV_CONFIG = {
    apiUrl: "https://cert.api.firstdata.com/gateway/v2",
    storeId: "your-store-id",
  };

  const validateCardNumber = (number) => {
    const cleanNumber = number.replace(/\s/g, "");
    if (
      !/^\d+$/.test(cleanNumber) ||
      cleanNumber.length < 13 ||
      cleanNumber.length > 19
    ) {
      return false;
    }

    let sum = 0;
    let isEven = false;

    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit = (digit % 10) + 1;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  const formatCardNumber = (value) => {
    const cleanValue = value.replace(/\s/g, "");
    const formatted = cleanValue.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted.trim();
  };

  const validateForm = () => {
    const newErrors = {};

    if (
      !paymentData.cardNumber ||
      !validateCardNumber(paymentData.cardNumber)
    ) {
      newErrors.cardNumber = "Número de tarjeta inválido";
    }

    if (
      !paymentData.expiryMonth ||
      parseInt(paymentData.expiryMonth) < 1 ||
      parseInt(paymentData.expiryMonth) > 12
    ) {
      newErrors.expiryMonth = "Mes inválido";
    }

    if (
      !paymentData.expiryYear ||
      parseInt(paymentData.expiryYear) < new Date().getFullYear()
    ) {
      newErrors.expiryYear = "Año inválido";
    }

    if (
      !paymentData.cvv ||
      paymentData.cvv.length < 3 ||
      paymentData.cvv.length > 4
    ) {
      newErrors.cvv = "CVV inválido";
    }

    if (!paymentData.cardholderName.trim()) {
      newErrors.cardholderName = "Nombre requerido";
    }

    if (!paymentData.amount || parseFloat(paymentData.amount) <= 0) {
      newErrors.amount = "Monto inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [paymentData]);

  const handleInputChange = (field, value) => {
    let processedValue = value;

    if (field === "cardNumber") {
      processedValue = formatCardNumber(value);
      if (processedValue.replace(/\s/g, "").length > 19) return;
    }

    if (field === "cvv") {
      processedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    if (field === "expiryMonth") {
      processedValue = value.replace(/\D/g, "").slice(0, 2);
    }

    if (field === "expiryYear") {
      processedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setPaymentData((prev) => ({
      ...prev,
      [field]: processedValue,
    }));
  };

  const processPayment = async () => {
    if (!validateForm()) return;

    setPaymentStatus("processing");

    try {
      const paymentPayload = {
        requestType: "PaymentCardSaleTransaction",
        transactionAmount: {
          total: parseFloat(paymentData.amount).toFixed(2),
          currency: paymentData.currency,
        },
        paymentMethod: {
          paymentCard: {
            number: paymentData.cardNumber.replace(/\s/g, ""),
            expiryDate: {
              month: paymentData.expiryMonth.padStart(2, "0"),
              year: paymentData.expiryYear,
            },
            securityCode: paymentData.cvv,
            cardholderName: paymentData.cardholderName,
          },
        },
      };

      const response = await fetch("/api/fiserv/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentPayload),
      });

      const result = await response.json();

      if (
        response.ok &&
        result.gatewayResponse?.transactionState === "AUTHORIZED"
      ) {
        setPaymentStatus("success");
        console.log("Pago exitoso:", result);
      } else {
        throw new Error(result.error || "Error en el procesamiento del pago");
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      setPaymentStatus("error");
    }
  };

  const resetForm = () => {
    setPaymentData({
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      cardholderName: "",
      amount: "",
      currency: "USD",
    });
    setPaymentStatus("idle");
    setErrors({});
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#12151f]/40 px-4 py-12">
      <div className="w-full max-w-md bg-[#1E2330]/70 p-6 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CreditCard className="w-8 h-8 text-[#FFFFFF]" />
            <h1 className="text-[#FFFFFF] text-3xl font-bold">Procesamiento</h1>
          </div>
          <h2 className="text-[#FFFFFF] text-3xl font-bold mb-4">de Pago</h2>
          <div className="flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-green-400" />
            <span className="text-[#EDEEF0] text-sm">Transacción segura</span>
          </div>
        </div>

        {paymentStatus === "success" && (
          <div className="mb-4 p-4 bg-green-500/20 border border-green-400/30 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-green-300">
              ¡Pago procesado exitosamente!
            </span>
          </div>
        )}

        {paymentStatus === "error" && (
          <div className="mb-4 p-4 bg-red-500/20 border border-red-400/30 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-300">
              Error al procesar el pago. Intente nuevamente.
            </span>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#EDEEF0] mb-1">
              Monto a pagar
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#EDEEF0]/70">
                $
              </span>
              <input
                type="number"
                step="0.01"
                value={paymentData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                className={`w-full pl-8 pr-3 py-2 bg-[#12151f]/50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[#FFFFFF] placeholder-[#EDEEF0]/50 ${
                  errors.amount ? "border-red-400" : "border-[#EDEEF0]/20"
                }`}
                placeholder="0.00"
                disabled={paymentStatus === "processing"}
              />
            </div>
            {errors.amount && (
              <p className="text-red-400 text-sm mt-1">{errors.amount}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#EDEEF0] mb-1">
              Número de tarjeta
            </label>
            <input
              type="text"
              value={paymentData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
              className={`w-full px-3 py-2 bg-[#12151f]/50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[#FFFFFF] placeholder-[#EDEEF0]/50 ${
                errors.cardNumber ? "border-red-400" : "border-[#EDEEF0]/20"
              }`}
              placeholder="1234 5678 9012 3456"
              disabled={paymentStatus === "processing"}
            />
            {errors.cardNumber && (
              <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-[#EDEEF0] mb-1">
                Mes
              </label>
              <input
                type="text"
                value={paymentData.expiryMonth}
                onChange={(e) =>
                  handleInputChange("expiryMonth", e.target.value)
                }
                className={`w-full px-3 py-2 bg-[#12151f]/50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[#FFFFFF] placeholder-[#EDEEF0]/50 ${
                  errors.expiryMonth ? "border-red-400" : "border-[#EDEEF0]/20"
                }`}
                placeholder="MM"
                disabled={paymentStatus === "processing"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#EDEEF0] mb-1">
                Año
              </label>
              <input
                type="text"
                value={paymentData.expiryYear}
                onChange={(e) =>
                  handleInputChange("expiryYear", e.target.value)
                }
                className={`w-full px-3 py-2 bg-[#12151f]/50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[#FFFFFF] placeholder-[#EDEEF0]/50 ${
                  errors.expiryYear ? "border-red-400" : "border-[#EDEEF0]/20"
                }`}
                placeholder="YYYY"
                disabled={paymentStatus === "processing"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#EDEEF0] mb-1">
                CVV
              </label>
              <input
                type="password"
                value={paymentData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
                className={`w-full px-3 py-2 bg-[#12151f]/50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[#FFFFFF] placeholder-[#EDEEF0]/50 ${
                  errors.cvv ? "border-red-400" : "border-[#EDEEF0]/20"
                }`}
                placeholder="123"
                disabled={paymentStatus === "processing"}
              />
            </div>
          </div>
          {(errors.expiryMonth || errors.expiryYear || errors.cvv) && (
            <p className="text-red-400 text-sm">
              {errors.expiryMonth || errors.expiryYear || errors.cvv}
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-[#EDEEF0] mb-1">
              Nombre del titular
            </label>
            <input
              type="text"
              value={paymentData.cardholderName}
              onChange={(e) =>
                handleInputChange("cardholderName", e.target.value)
              }
              className={`w-full px-3 py-2 bg-[#12151f]/50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[#FFFFFF] placeholder-[#EDEEF0]/50 ${
                errors.cardholderName ? "border-red-400" : "border-[#EDEEF0]/20"
              }`}
              placeholder="Juan Pérez"
              disabled={paymentStatus === "processing"}
            />
            {errors.cardholderName && (
              <p className="text-red-400 text-sm mt-1">
                {errors.cardholderName}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            {paymentStatus === "success" ? (
              <button
                type="button"
                onClick={resetForm}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 font-medium"
              >
                Nuevo Pago
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-[#12151f]/50 text-[#EDEEF0] py-2 px-4 rounded-lg hover:bg-[#12151f]/70 transition duration-200 border border-[#EDEEF0]/20 font-medium"
                  disabled={paymentStatus === "processing"}
                >
                  Limpiar
                </button>
                <button
                  type="button"
                  onClick={processPayment}
                  disabled={!isFormValid || paymentStatus === "processing"}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center gap-2 font-medium"
                >
                  {paymentStatus === "processing" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    "Procesar Pago"
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="mt-6 text-xs text-[#EDEEF0]/70 text-center flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          Transacción segura procesada por Fiserv
        </div>
      </div>
    </div>
  );
};

export default FiservPaymentComponent;
