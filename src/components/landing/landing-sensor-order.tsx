'use client';
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Toast } from "@/components/toast";

type Trans = 'email' | 'emailPlaceholder' | 'name' | 'namePlaceholder' | 'contact' | 'contactPlaceholder' | 'district' | 'districtPlaceholder' | 'sensor' | 'sensorStandard' | 'sensorDiy' | 'submit' | 'terms' | 'hint' | 'success' | 'error';
export const OrderForm: FC<{
    t: Record<Trans, string>;
    sensors: [string, string][];
}> = ({  sensors, t }) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<boolean | undefined>(undefined);
    const [to, setTo] = useState<number | undefined>(undefined);
    const { formState: { errors }, handleSubmit, register, reset } = useForm({
        defaultValues: {
            name: '',
            email: '',
            district: '',
            contact: '',
            sensor: sensors[0][0]
        },
    });
    const onSubmit = async (data: any) => {
        setLoading(true);
        setResult(undefined);
        if (to) {
            clearTimeout(to);
            setTo(undefined);
        }
        const success = await fetch('/api/order', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ ...data }),
        })
            .then(res => res.json())
            .then(({ success }) => success)
            .catch(() => false)
        ;

        setResult(success);
        setLoading(false);

        if (success) {
            reset();
        } else {
            setTo(
                setTimeout(() => {
                    setResult(undefined);
                    setTo(undefined);
                }, 5000) as any
            );
        }
    };

    return result ? (
      <p className="text-white text-center text-lg bg-green-500 w-full py-4 ">{t.success}</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {result === false ? <Toast status="error" text={t.error} /> : null}
          
            <label className="block mb-4" htmlFor="email">
              <p className="text-gray-600">{t.email}</p>
              <input
                className="w-full border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                type="email"
                placeholder={t.emailPlaceholder}
                {...register("email", { required: true })}
                disabled={loading}
                required
              />
            </label>
            <label className="block mb-4" htmlFor="name">
              <p className="text-gray-600">{t.name}</p>
              <input
                className="w-full border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                type="text"
                placeholder={t.namePlaceholder}
                {...register("name", { required: true })}
                disabled={loading}
                required
              />
            </label>
            <label className="block mb-4" htmlFor="contact">
              <p className="text-gray-600">{t.contact}</p>
              <input
                className="w-full border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                type="text"
                placeholder={t.contactPlaceholder}
                {...register("contact", { required: true })}
                disabled={loading}
                required
              />
            </label>
            <label className="block mb-4" htmlFor="district">
              <p className="text-gray-600">{t.district}</p>
              <input
                className="w-full border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                type="text"
                placeholder={t.districtPlaceholder}
                {...register("district", { required: true })}
                disabled={loading}
                required
              />
            </label>

            <div className="flex flex-col sm:col-span-3 w-full mb-4">
              <label className="text-gray-600" htmlFor="sensor-select">{t.sensor}</label>
              <select
                id="sensor-select"
                className="border px-2 py-2 shadow-sm outline-none focus:ring"
                {...register("sensor", { required: true })}
                disabled={loading}
              >
                {sensors.map(([key, text]) => (
                  <option key={key} value={key}>{text}</option>
            ))}
              </select>
            </div>

            <div className="w-full flex flex-col items-center justify-center">
              <div className="bg-green-300 bg-opacity-50 px-8 py-4 text-center">{t.hint}</div>
              <button
                className="mt-4 bg-armaqi-base font-semibold py-4 px-16 text-white"
                disabled={loading}
                aria-label={t.submit}
              >
                {t.submit}
              </button>
            
              <p className="font-light mt-8">{t.terms}</p>
            </div>
          </form>
    );
};
