'use client';
import { FC } from "react";
import { useForm } from "react-hook-form";


type Trans = 'email' | 'emailPlaceholder' | 'name' | 'namePlaceholder' | 'contact' | 'contactPlaceholder' | 'district' | 'districtPlaceholder' | 'sensor' | 'sensorStandard' | 'sensorDiy' | 'submit' | 'terms';
export const OrderForm: FC<{
    t: Record<Trans, string>;
    sensors: string[];
}> = ({ sensors, t }) => {
    const { handleSubmit, register } = useForm({
        defaultValues: {
            name: '',
            email: '',
            district: '',
            contact: '',
            sensor: sensors[0]
        }
    });
    const onSubmit = (data: any) => console.log(data);

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block mb-4" htmlFor="email">
          <p className="text-gray-600">{t.email}</p>
          <input
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
            type="email"
            placeholder={t.emailPlaceholder}
            {...register("email", { required: true })}
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
            required
          />
        </label>

        <div className="flex flex-col sm:col-span-3 w-full mb-4">
          <label className="text-gray-600" htmlFor="sensor">{t.sensor}</label>
          <select
            className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
            {...register("sensor", { required: true })}
          >
            {sensors.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          <button className="mt-4 rounded-md bg-blue-800 px-10 py-2 font-semibold text-white">{t.submit}</button>

          <p className="font-light mt-8">{t.terms}</p>
        </div>
      </form>
    );
};
