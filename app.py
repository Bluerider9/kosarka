import streamlit as st
import fitz  # PyMuPDF
from io import BytesIO
import os

st.set_page_config(page_title="Kreiranje treninga", layout="centered")
st.title("Kreiranje treninga")

# Korisnički unosi
datum = st.date_input("Datum").strftime("%d.%m.%Y.")
kategorija = st.selectbox("Kategorija", [" ", "Škola košarke", "U12", "U14", "U16", "SEN"])
broj_treninga = st.number_input("Broj treninga", step=1, min_value=1)
broj_igraca = st.number_input("Broj igrača na treningu", step=1, min_value=1)
uvod = st.text_area("Uvod")
glavni_dio = st.text_area("Glavni dio")
zavrsni_dio = st.text_area("Završni dio")

if st.button("Generiraj PDF"):
    template_path = "spranca.pdf"
    font_path = "Roboto.ttf"  # Naziv fonta koji mora biti u direktoriju

    if not os.path.exists(template_path) or not os.path.exists(font_path):
        st.error(f"Greška: Provjerite da li datoteke '{template_path}' i '{font_path}' postoje u direktoriju.")
    else:
        doc = fitz.open(template_path)
        page = doc[0]

        fontname = "roboto"
        page.insert_font(fontfile=font_path, fontname=fontname)  # Dodaj font s hrvatskim znakovima

        fs_title = 18
        fs_text = 14

        # Kreiraj TextWriter za bolju kontrolu nad Unicodeom
        tw = fitz.TextWriter(page.rect)

        # Datum, kategorija, brojevi
        tw.append((110, 80), datum, fontsize=fs_text, fontname=fontname)
        tw.append((110, 40), kategorija, fontsize=fs_title, fontname=fontname)
        tw.append((540, 40), str(broj_treninga), fontsize=fs_text, fontname=fontname)
        tw.append((540, 80), str(broj_igraca), fontsize=fs_text, fontname=fontname)

        # Glavni tekstovi
        tw.append((230, 200), uvod, fontsize=fs_text, fontname=fontname)
        tw.append((230, 360), glavni_dio, fontsize=fs_text, fontname=fontname)
        tw.append((230, 600), zavrsni_dio, fontsize=fs_text, fontname=fontname)

        # Napiši sve na stranicu
        tw.write_text(page)

        # Spremi PDF u memoriju
        output_pdf = BytesIO()
        doc.save(output_pdf)
        doc.close()
        output_pdf.seek(0)

        st.success("PDF je generiran!")
        st.download_button("Preuzmi PDF", output_pdf, file_name="trening.pdf", mime="application/pdf")
