"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Reveal from "./Reveal";

type FormType = "honorary" | "alumni";

type FormState = Record<
  "full_name" | "email" | "father_husband_name" | "residential_address" | "phone" | "designation" | "office_address" | "chinese_institution_city" | "qualification" | "qualification_year" | "honorary_membership",
  string
>;

const empty: FormState = {
  full_name: "", email: "", father_husband_name: "", residential_address: "", phone: "", designation: "", office_address: "", chinese_institution_city: "", qualification: "", qualification_year: "", honorary_membership: "",
};

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent";
const labelClass = "block text-sm font-medium text-brand-slate mb-1.5";

export default function MembershipForm() {
  const [type, setType] = useState<FormType>("honorary");
  const [form, setForm] = useState<FormState>(empty);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const isAlumni = type === "alumni";
  const update = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }));

  function selectType(nextType: FormType) {
    setType(nextType);
    setError("");
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, application_type: type }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed");
      }
      setDone(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <section id="membership" className="scroll-mt-16 bg-brand-light py-20 sm:py-24">
        <Reveal className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-brand-red/10 flex items-center justify-center mb-6">✓</div>
          <h2 className="text-3xl font-bold text-brand-blue">Membership Activated</h2>
          <p className="mt-4 text-brand-slate text-lg leading-relaxed">Thank you for joining PCFA Lahore. Your information has been added to our member community.</p>
          <Link href="/#home" className="inline-block mt-8 bg-brand-blue text-white font-bold px-7 py-3 rounded-lg hover:bg-brand-blue-dark transition-colors">Back to Home</Link>
        </Reveal>
      </section>
    );
  }

  return (
    <section id="membership" className="scroll-mt-16 bg-brand-light py-20 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="text-brand-red font-semibold tracking-widest uppercase text-sm">Join PCFA Lahore</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-brand-blue">Apply to Join</h2>
          <p className="mt-4 text-brand-slate text-lg leading-relaxed">Choose the application that best reflects your connection with PCFA Lahore.</p>
        </Reveal>

        <Reveal delay={80} className="mt-10 grid sm:grid-cols-2 gap-4" role="tablist" aria-label="Application type">
          <button type="button" onClick={() => selectType("honorary")} className={`rounded-xl text-left p-5 border-2 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${!isAlumni ? "border-brand-blue bg-white" : "border-transparent bg-white/70 hover:border-slate-300"}`}>
            <span className="text-sm font-bold text-brand-blue">Honorary Membership</span>
            <span className="block mt-2 text-sm leading-relaxed text-brand-slate">For individuals who wish to support PCFA Lahore and Pakistan-China friendship.</span>
          </button>
          <button type="button" onClick={() => selectType("alumni")} className={`rounded-xl text-left p-5 border-2 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${isAlumni ? "border-brand-blue bg-white" : "border-transparent bg-white/70 hover:border-slate-300"}`}>
            <span className="text-sm font-bold text-brand-blue">Alumni Chapter</span>
            <span className="block mt-2 text-sm leading-relaxed text-brand-slate">For Pakistanis who have studied at an educational institution in China.</span>
          </button>
        </Reveal>

        <Reveal delay={150}>
        <form onSubmit={onSubmit} className="mt-6 bg-white border border-slate-200 rounded-xl p-5 sm:p-8 space-y-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
          <div className="border-b border-slate-200 pb-5">
            <h3 className="text-xl font-bold text-brand-blue">{isAlumni ? "Alumni Chapter Membership Form" : "Honorary Membership Form"}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-slate">{isAlumni ? "Stay connected through social, academic, cultural and networking activities organised by PCFA Lahore." : "Help strengthen people-to-people contact, mutual understanding, friendship and cooperation between Pakistan and China."}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Name" required><input required className={inputClass} value={form.full_name} onChange={(event) => update("full_name", event.target.value)} /></Field>
            <Field label="Email" required><input required type="email" className={inputClass} value={form.email} onChange={(event) => update("email", event.target.value)} /></Field>
          </div>
          {!isAlumni && <Field label="Father / Husband Name" required><input required className={inputClass} value={form.father_husband_name} onChange={(event) => update("father_husband_name", event.target.value)} /></Field>}
          <Field label="Residential Address" required><textarea required rows={3} className={inputClass} value={form.residential_address} onChange={(event) => update("residential_address", event.target.value)} /></Field>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Cell Number"><input type="tel" className={inputClass} value={form.phone} onChange={(event) => update("phone", event.target.value)} /></Field>
            <Field label="Profession / Designation"><input className={inputClass} value={form.designation} onChange={(event) => update("designation", event.target.value)} /></Field>
          </div>
          <Field label="Office Address"><input className={inputClass} value={form.office_address} onChange={(event) => update("office_address", event.target.value)} /></Field>
          {isAlumni && <>
            <Field label="Name of Chinese Institution and City"><input className={inputClass} value={form.chinese_institution_city} onChange={(event) => update("chinese_institution_city", event.target.value)} /></Field>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Degree / Diploma / Certification"><input className={inputClass} value={form.qualification} onChange={(event) => update("qualification", event.target.value)} /></Field>
              <Field label="Year of Degree / Diploma / Certification"><input className={inputClass} value={form.qualification_year} onChange={(event) => update("qualification_year", event.target.value)} /></Field>
            </div>
          </>}
          <fieldset>
            <legend className={labelClass}>{isAlumni ? "I hereby apply for membership of the PCFA Alumni Chapter." : "I hereby apply for honorary membership of PCFA Lahore."} <span className="text-brand-red">*</span></legend>
            <div className="flex gap-5 text-sm text-brand-slate">
              {(["yes", "no"] as const).map((option) => <label key={option} className="flex items-center gap-2 capitalize"><input required type="radio" name="honorary_membership" value={option} checked={form.honorary_membership === option} onChange={(event) => update("honorary_membership", event.target.value)} />{option}</label>)}
            </div>
          </fieldset>
          {error && <p className="text-brand-red text-sm font-medium">{error}</p>}
          <button type="submit" disabled={submitting} className="w-full bg-brand-blue text-white font-bold py-3 rounded-lg hover:bg-brand-blue-dark disabled:opacity-60 transition-colors">{submitting ? "Submitting..." : `Submit ${isAlumni ? "Alumni" : "Membership"} Application`}</button>
        </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, required = false, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return <div><label className={labelClass}>{label} {required && <span className="text-brand-red">*</span>}</label>{children}</div>;
}
