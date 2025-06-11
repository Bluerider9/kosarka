
import streamlit as st
import fitz  # PyMuPDF
from io import BytesIO

st.set_page_config(page_title="PDF Generator", layout="centered")
st.title("PDF Generator iz Šprance")

# Korisnički unosi
ime = st.text_input("Ime i prezime")
datum = st.text_input("Datum rođenja")
napomena = st.text_area("Napomena")

if st.button("Generiraj PDF"):
    # Učitavanje šprance
    template_path = "spranca.pdf"
    doc = fitz.open(template_path)
    page = doc[0]

    # Dodavanje teksta na definirane pozicije
    page.insert_text((100, 100), f"Ime i prezime: {ime}", fontsize=12)
    page.insert_text((100, 130), f"Datum rođenja: {datum}", fontsize=12)
    page.insert_text((100, 160), f"Napomena: {napomena}", fontsize=12)

    # Spremanje u memoriju
    output_pdf = BytesIO()
    doc.save(output_pdf)
    doc.close()
    output_pdf.seek(0)

    # Preuzimanje
    st.success("PDF je generiran!")
    st.download_button("Preuzmi PDF", output_pdf, file_name="generirani_izlaz.pdf", mime="application/pdf")
