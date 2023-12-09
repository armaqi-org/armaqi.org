'use client';
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toast } from "@/components/toast";

type Trans = 'email' | 'emailPlaceholder' | 'name' | 'namePlaceholder' | 'contact' | 'contactPlaceholder' | 'district' | 'districtPlaceholder' | 'sensor' | 'sensorStandard' | 'sensorDiy' | 'submit' | 'terms' | 'success' | 'error';
export const OrderForm: FC<{
    t: Record<Trans, string>;
    sensors: string[];
}> = ({  sensors, t }) => {
    const [csrf, setCsrf] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<boolean | undefined>(undefined);
    const [to, setTo] = useState<number | undefined>(undefined);
    const { handleSubmit, register, reset } = useForm({
        defaultValues: {
            name: '',
            email: '',
            district: '',
            contact: '',
            sensor: sensors[0]
        }
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
            body: JSON.stringify({ ...data, csrf }),
        })
            .then(res => res.json())
            .then(({ success }) => success)
            .catch(() => false)
        ;

        setResult(success);
        setLoading(false);

        if (success) {
            reset();
        }

        setTo(
            setTimeout(() => {
                setResult(undefined);
                setTo(undefined);
            }, 5000) as any
        );
    };

    useEffect(() => {
        fetch('/api/auth/csrf')
            .then(res => res.json())
            .then(({ csrfToken }) => setCsrf(csrfToken));
    }, []);

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        {result !== undefined ? <Toast status={result ? "success" : 'error'} text={result ? t.success : t.error} /> : null}
          
        <label className="block mb-4" htmlFor="email">
          <p className="text-gray-600">{t.email}</p>
          <input
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
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
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
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
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
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
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
            type="text"
            placeholder={t.districtPlaceholder}
            {...register("district", { required: true })}
            disabled={loading}
            required
          />
        </label>

        <div className="flex flex-col sm:col-span-3 w-full mb-4">
          <label className="text-gray-600" htmlFor="sensor">{t.sensor}</label>
          <select
            className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
            {...register("sensor", { required: true })}
            disabled={loading}
          >
            {sensors.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          <input type="hidden" value={csrf} name="csrf" />
          <button
            className="mt-4 rounded-md bg-blue-800 px-10 py-2 font-semibold text-white"
            disabled={loading}
          >
            {t.submit}
          </button>

          <p className="font-light mt-8">{t.terms}</p>
        </div>
      </form>
    );
};
