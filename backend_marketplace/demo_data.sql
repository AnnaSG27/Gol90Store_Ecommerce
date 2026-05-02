--
-- PostgreSQL database dump
--

-- Dumped from database version 16.13
-- Dumped by pg_dump version 16.13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: marketplace
--



--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: marketplace
--

INSERT INTO public.django_content_type VALUES (1, 'admin', 'logentry');
INSERT INTO public.django_content_type VALUES (2, 'auth', 'group');
INSERT INTO public.django_content_type VALUES (3, 'auth', 'permission');
INSERT INTO public.django_content_type VALUES (4, 'contenttypes', 'contenttype');
INSERT INTO public.django_content_type VALUES (5, 'sessions', 'session');
INSERT INTO public.django_content_type VALUES (6, 'usuarios', 'experiencia');
INSERT INTO public.django_content_type VALUES (7, 'usuarios', 'habilidad');
INSERT INTO public.django_content_type VALUES (8, 'usuarios', 'perfil');
INSERT INTO public.django_content_type VALUES (9, 'usuarios', 'usuario');
INSERT INTO public.django_content_type VALUES (10, 'publicaciones', 'imagenpublicacion');
INSERT INTO public.django_content_type VALUES (11, 'publicaciones', 'publicacion');


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: marketplace
--

INSERT INTO public.auth_permission VALUES (1, 'Can add log entry', 1, 'add_logentry');
INSERT INTO public.auth_permission VALUES (2, 'Can change log entry', 1, 'change_logentry');
INSERT INTO public.auth_permission VALUES (3, 'Can delete log entry', 1, 'delete_logentry');
INSERT INTO public.auth_permission VALUES (4, 'Can view log entry', 1, 'view_logentry');
INSERT INTO public.auth_permission VALUES (5, 'Can add permission', 3, 'add_permission');
INSERT INTO public.auth_permission VALUES (6, 'Can change permission', 3, 'change_permission');
INSERT INTO public.auth_permission VALUES (7, 'Can delete permission', 3, 'delete_permission');
INSERT INTO public.auth_permission VALUES (8, 'Can view permission', 3, 'view_permission');
INSERT INTO public.auth_permission VALUES (9, 'Can add group', 2, 'add_group');
INSERT INTO public.auth_permission VALUES (10, 'Can change group', 2, 'change_group');
INSERT INTO public.auth_permission VALUES (11, 'Can delete group', 2, 'delete_group');
INSERT INTO public.auth_permission VALUES (12, 'Can view group', 2, 'view_group');
INSERT INTO public.auth_permission VALUES (13, 'Can add content type', 4, 'add_contenttype');
INSERT INTO public.auth_permission VALUES (14, 'Can change content type', 4, 'change_contenttype');
INSERT INTO public.auth_permission VALUES (15, 'Can delete content type', 4, 'delete_contenttype');
INSERT INTO public.auth_permission VALUES (16, 'Can view content type', 4, 'view_contenttype');
INSERT INTO public.auth_permission VALUES (17, 'Can add session', 5, 'add_session');
INSERT INTO public.auth_permission VALUES (18, 'Can change session', 5, 'change_session');
INSERT INTO public.auth_permission VALUES (19, 'Can delete session', 5, 'delete_session');
INSERT INTO public.auth_permission VALUES (20, 'Can view session', 5, 'view_session');
INSERT INTO public.auth_permission VALUES (21, 'Can add Habilidad', 7, 'add_habilidad');
INSERT INTO public.auth_permission VALUES (22, 'Can change Habilidad', 7, 'change_habilidad');
INSERT INTO public.auth_permission VALUES (23, 'Can delete Habilidad', 7, 'delete_habilidad');
INSERT INTO public.auth_permission VALUES (24, 'Can view Habilidad', 7, 'view_habilidad');
INSERT INTO public.auth_permission VALUES (25, 'Can add Usuario', 9, 'add_usuario');
INSERT INTO public.auth_permission VALUES (26, 'Can change Usuario', 9, 'change_usuario');
INSERT INTO public.auth_permission VALUES (27, 'Can delete Usuario', 9, 'delete_usuario');
INSERT INTO public.auth_permission VALUES (28, 'Can view Usuario', 9, 'view_usuario');
INSERT INTO public.auth_permission VALUES (29, 'Can add Perfil', 8, 'add_perfil');
INSERT INTO public.auth_permission VALUES (30, 'Can change Perfil', 8, 'change_perfil');
INSERT INTO public.auth_permission VALUES (31, 'Can delete Perfil', 8, 'delete_perfil');
INSERT INTO public.auth_permission VALUES (32, 'Can view Perfil', 8, 'view_perfil');
INSERT INTO public.auth_permission VALUES (33, 'Can add Experiencia', 6, 'add_experiencia');
INSERT INTO public.auth_permission VALUES (34, 'Can change Experiencia', 6, 'change_experiencia');
INSERT INTO public.auth_permission VALUES (35, 'Can delete Experiencia', 6, 'delete_experiencia');
INSERT INTO public.auth_permission VALUES (36, 'Can view Experiencia', 6, 'view_experiencia');
INSERT INTO public.auth_permission VALUES (37, 'Can add Publicación', 11, 'add_publicacion');
INSERT INTO public.auth_permission VALUES (38, 'Can change Publicación', 11, 'change_publicacion');
INSERT INTO public.auth_permission VALUES (39, 'Can delete Publicación', 11, 'delete_publicacion');
INSERT INTO public.auth_permission VALUES (40, 'Can view Publicación', 11, 'view_publicacion');
INSERT INTO public.auth_permission VALUES (41, 'Can add Imagen de Publicación', 10, 'add_imagenpublicacion');
INSERT INTO public.auth_permission VALUES (42, 'Can change Imagen de Publicación', 10, 'change_imagenpublicacion');
INSERT INTO public.auth_permission VALUES (43, 'Can delete Imagen de Publicación', 10, 'delete_imagenpublicacion');
INSERT INTO public.auth_permission VALUES (44, 'Can view Imagen de Publicación', 10, 'view_imagenpublicacion');


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: marketplace
--



--
-- Data for Name: usuarios_usuario; Type: TABLE DATA; Schema: public; Owner: marketplace
--

INSERT INTO public.usuarios_usuario VALUES ('pbkdf2_sha256$1200000$Xb7j6NGzMLbsSwJ12PdSHx$SS2f5DcdO7klScpRZRAKomqk7TsuWEChbqBrR153zBA=', NULL, false, 'María', 'López', false, true, '2026-03-25 04:36:02.606265+00', '19b9c0fd-7308-42fd-ac7b-23a0843ff478', 'maria.lopez@example.com');
INSERT INTO public.usuarios_usuario VALUES ('pbkdf2_sha256$1200000$49F5WkuEg8hpwopW2dQFrc$HYyjr0R+DXcOZepGidHWnEodDmhuBRoWaLvmRldqc2A=', NULL, false, 'Carlos', 'García', false, true, '2026-03-25 04:36:02.863905+00', 'e91dafde-3520-40cd-acde-30928b06f11e', 'carlos.garcia@example.com');
INSERT INTO public.usuarios_usuario VALUES ('pbkdf2_sha256$1200000$dEZdUtDTpB53J9Hr69euUl$51/bxaArNZQjAEgsPEw73+WteqRK++nAcnOl1xqE6ao=', NULL, false, 'Ana', 'Martínez', false, true, '2026-03-25 04:36:03.110979+00', 'b844f358-2ddf-4bd1-9836-cd51ace66c91', 'ana.martinez@example.com');
INSERT INTO public.usuarios_usuario VALUES ('pbkdf2_sha256$1200000$QPb92QmjeprFjyFeHlHjCn$3ox+Us9Se1TsKwnScPRv8ubmdpjgw97T4qDKtCCbUuU=', NULL, false, 'Jorge', 'Ramírez', false, true, '2026-03-25 04:36:03.358629+00', 'c907698d-1857-4f9d-b29f-2fb82b5f6c93', 'jorge.ramirez@example.com');
INSERT INTO public.usuarios_usuario VALUES ('pbkdf2_sha256$1200000$bGJI7b5KWIpnEJpYhhHnBn$lvYrmtlDQnyoX+AK3m6TqHQu+YUdrJ39jAE/vBK8lVQ=', NULL, false, 'Laura', 'Hernández', false, true, '2026-03-25 04:36:03.60985+00', 'd69af16e-445a-45bb-ad6f-dda581312cf1', 'laura.hernandez@example.com');
INSERT INTO public.usuarios_usuario VALUES ('pbkdf2_sha256$1200000$avTlb37iWPv3NLAYHhqLGR$zwa7J1sHJ0mLXXJbf2C/NinbPCwt5g5ExFxpCQREGdo=', NULL, false, 'David', 'Torres', false, true, '2026-03-25 04:36:03.861496+00', 'f785047c-a67f-4447-aef5-aed3339f8470', 'david.torres@example.com');
INSERT INTO public.usuarios_usuario VALUES ('pbkdf2_sha256$1200000$Z65cHIJG54kdaxPGjqQjZl$5StMiF8HHejzJa2TwYrIxMfbGx3kPYR4JE1QdwqOf0A=', NULL, false, 'Camila', 'Rojas', false, true, '2026-03-25 04:36:04.108464+00', 'f620541f-0531-4132-94ae-c438c2552a3e', 'camila.rojas@example.com');
INSERT INTO public.usuarios_usuario VALUES ('pbkdf2_sha256$1200000$Dr18ShzW9eyLGh9Lu8rNrB$kfo4XEJXNcWXy6g8nxPvyD/lWBzdQriDf8LFb7AySRM=', NULL, false, 'Andrés', 'Moreno', false, true, '2026-03-25 04:36:04.355587+00', 'b1bc267f-c7d1-48e8-a2a2-97719fa62c0c', 'andres.moreno@example.com');


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: marketplace
--



--
-- Data for Name: publicaciones_publicacion; Type: TABLE DATA; Schema: public; Owner: marketplace
--

INSERT INTO public.publicaciones_publicacion VALUES ('40ea5088-878d-42ae-a6eb-d397bbcaa5b6', 'Diseño de logotipo profesional para tu marca', 'Creo logotipos únicos y memorables que representan la esencia de tu marca. Incluye investigación de mercado, 3 propuestas iniciales, revisiones ilimitadas y entrega en formatos vectoriales (AI, SVG, PNG, PDF).', 'diseno', 250000.00, '5 días', '["3 propuestas iniciales", "Revisiones ilimitadas", "Archivos fuente AI/SVG", "Manual de marca básico"]', '', 'publicado', '2026-03-25 04:36:04.627529+00', '2026-03-25 04:36:04.62754+00', '19b9c0fd-7308-42fd-ac7b-23a0843ff478');
INSERT INTO public.publicaciones_publicacion VALUES ('5ec106bb-393e-43b4-b801-e69778718a10', 'Desarrollo de landing page con React y Tailwind', 'Desarrollo landing pages modernas, responsivas y optimizadas para conversión. Uso React, Next.js y Tailwind CSS para garantizar rendimiento y diseño impecable. Incluye formulario de contacto funcional y despliegue.', 'desarrollo', 800000.00, '7 días', '["Diseño responsivo", "SEO básico", "Formulario de contacto", "Deploy en Vercel"]', '', 'publicado', '2026-03-25 04:36:04.629021+00', '2026-03-25 04:36:04.62903+00', 'e91dafde-3520-40cd-acde-30928b06f11e');
INSERT INTO public.publicaciones_publicacion VALUES ('a1a86afa-38cf-4656-a764-793f727a249a', 'Estrategia de marketing digital para redes sociales', 'Diseño una estrategia completa de marketing digital para tus redes sociales. Incluye análisis de audiencia, calendario de contenido para 1 mes, lineamientos gráficos y recomendaciones de pauta publicitaria.', 'marketing', 450000.00, '10 días', '["Análisis de audiencia", "Calendario 30 días", "Guía de contenido", "Reporte de métricas"]', '', 'publicado', '2026-03-25 04:36:04.630224+00', '2026-03-25 04:36:04.630232+00', 'b844f358-2ddf-4bd1-9836-cd51ace66c91');
INSERT INTO public.publicaciones_publicacion VALUES ('65666384-159d-423b-b7f0-56f7f310a79c', 'Redacción de artículos SEO para blog corporativo', 'Escribo artículos optimizados para posicionamiento en buscadores. Cada artículo incluye investigación de keywords, estructura SEO, meta descripción y enlaces internos sugeridos.', 'redaccion', 120000.00, '3 días', '["Investigación de keywords", "Artículo de 1500+ palabras", "Meta descripción", "Imágenes sugeridas"]', '', 'publicado', '2026-03-25 04:36:04.631227+00', '2026-03-25 04:36:04.631235+00', 'd69af16e-445a-45bb-ad6f-dda581312cf1');
INSERT INTO public.publicaciones_publicacion VALUES ('a5dabbe3-e1f1-46c3-b32d-7ffffea3dc6c', 'Edición profesional de video para YouTube', 'Edito videos con calidad profesional para canales de YouTube. Incluye corrección de color, transiciones, subtítulos, música de fondo libre de derechos y thumbnail personalizado.', 'video', 350000.00, '4 días', '["Corrección de color", "Subtítulos", "Música libre de derechos", "Thumbnail personalizado"]', '', 'publicado', '2026-03-25 04:36:04.632306+00', '2026-03-25 04:36:04.632314+00', 'f785047c-a67f-4447-aef5-aed3339f8470');
INSERT INTO public.publicaciones_publicacion VALUES ('c467108c-a632-45b3-954b-b014d9e706b1', 'Desarrollo de API REST con Django y PostgreSQL', 'Diseño y desarrollo APIs RESTful robustas usando Django REST Framework. Incluye autenticación JWT, documentación Swagger, tests unitarios y despliegue en contenedor Docker.', 'desarrollo', 1200000.00, '14 días', '["Autenticación JWT", "Documentación Swagger", "Tests unitarios", "Docker"]', '', 'publicado', '2026-03-25 04:36:04.633337+00', '2026-03-25 04:36:04.633346+00', 'e91dafde-3520-40cd-acde-30928b06f11e');
INSERT INTO public.publicaciones_publicacion VALUES ('3ea10c3f-aa68-4449-9485-2815566976d7', 'Diseño de interfaz UI/UX para aplicación móvil', 'Diseño interfaces intuitivas y atractivas para aplicaciones móviles. Proceso completo: wireframes, prototipos interactivos en Figma y sistema de diseño reutilizable.', 'diseno', 900000.00, '12 días', '["Wireframes", "Prototipo interactivo Figma", "Sistema de diseño", "Handoff para desarrollo"]', '', 'publicado', '2026-03-25 04:36:04.634499+00', '2026-03-25 04:36:04.634508+00', '19b9c0fd-7308-42fd-ac7b-23a0843ff478');
INSERT INTO public.publicaciones_publicacion VALUES ('886d6051-6d5f-4856-aa4b-ac2b435cd444', 'Gestión de campañas en Google Ads', 'Configuro y optimizo campañas de Google Ads para maximizar tu ROI. Incluye investigación de keywords, creación de anuncios, segmentación de audiencia y reportes semanales de rendimiento.', 'marketing', 600000.00, '30 días', '["Configuración de campañas", "Investigación de keywords", "Reportes semanales", "Optimización continua"]', '', 'publicado', '2026-03-25 04:36:04.635563+00', '2026-03-25 04:36:04.635573+00', 'b844f358-2ddf-4bd1-9836-cd51ace66c91');
INSERT INTO public.publicaciones_publicacion VALUES ('97e5cc46-6c69-4b8c-a2a7-e56280b17cb5', 'Traducción profesional español-inglés de documentos', 'Ofrezco traducciones precisas y naturales entre español e inglés. Especialidad en documentos técnicos, legales y de marketing. Revisión por segundo traductor incluida.', 'redaccion', 80000.00, '2 días', '["Traducción profesional", "Revisión por par", "Formato preservado", "Glosario de términos"]', '', 'publicado', '2026-03-25 04:36:04.636864+00', '2026-03-25 04:36:04.636874+00', 'd69af16e-445a-45bb-ad6f-dda581312cf1');
INSERT INTO public.publicaciones_publicacion VALUES ('df8d25c7-5137-4704-b91e-7efbe35dc3e4', 'Creación de motion graphics para redes sociales', 'Creo animaciones cortas y atractivas para Instagram, TikTok y LinkedIn. Perfectas para anuncios, explicaciones de producto o contenido de marca.', 'video', 400000.00, '5 días', '["Animación hasta 30 segundos", "Música incluida", "3 formatos (1:1, 9:16, 16:9)", "1 revisión"]', '', 'publicado', '2026-03-25 04:36:04.638364+00', '2026-03-25 04:36:04.638375+00', 'f785047c-a67f-4447-aef5-aed3339f8470');
INSERT INTO public.publicaciones_publicacion VALUES ('0edf3ffe-1c11-4f5f-86a2-7298d74d0bf3', 'Desarrollo de tienda online con Shopify', 'Configuro tu tienda en Shopify desde cero: diseño personalizado, integración de pasarela de pagos, catálogo de productos y optimización móvil.', 'desarrollo', 1500000.00, '15 días', '["Diseño personalizado", "Pasarela de pagos", "Hasta 50 productos", "Capacitación"]', '', 'publicado', '2026-03-25 04:36:04.639717+00', '2026-03-25 04:36:04.639726+00', 'c907698d-1857-4f9d-b29f-2fb82b5f6c93');
INSERT INTO public.publicaciones_publicacion VALUES ('adbc1641-6e57-4a00-8649-239e5d020775', 'Consultoría SEO y auditoría de sitio web', 'Realizo una auditoría completa de tu sitio web enfocada en SEO técnico, contenido y autoridad de dominio. Entrego un plan de acción priorizado con recomendaciones concretas.', 'marketing', 350000.00, '7 días', '["Auditoría técnica", "Análisis de contenido", "Análisis de backlinks", "Plan de acción"]', '', 'publicado', '2026-03-25 04:36:04.641039+00', '2026-03-25 04:36:04.641049+00', 'b844f358-2ddf-4bd1-9836-cd51ace66c91');
INSERT INTO public.publicaciones_publicacion VALUES ('ea9c40fe-b3d7-4a37-adf9-be174a2f20ed', 'Diseño de presentaciones corporativas en PowerPoint', 'Diseño presentaciones visualmente impactantes para reuniones, pitch decks e informes. Plantillas editables con tu identidad de marca.', 'diseno', 180000.00, '3 días', '["Hasta 20 slides", "Plantilla editable", "Iconografía personalizada", "Versión PDF"]', '', 'publicado', '2026-03-25 04:36:04.642664+00', '2026-03-25 04:36:04.642676+00', '19b9c0fd-7308-42fd-ac7b-23a0843ff478');
INSERT INTO public.publicaciones_publicacion VALUES ('a4a39fb9-44c9-48d7-abd1-38eacd3f5555', 'Automatización de procesos con Python y scripts', 'Automatizo tareas repetitivas de tu negocio: scraping de datos, generación de reportes, procesamiento de archivos y más. Soluciones a medida con Python.', 'desarrollo', 500000.00, '7 días', '["Script personalizado", "Documentación", "Soporte 1 semana", "Código fuente"]', '', 'publicado', '2026-03-25 04:36:04.644682+00', '2026-03-25 04:36:04.644695+00', 'e91dafde-3520-40cd-acde-30928b06f11e');
INSERT INTO public.publicaciones_publicacion VALUES ('a301797f-5c05-493c-820e-91a5c5666174', 'Redacción de copy para landing pages y ads', 'Escribo textos persuasivos que convierten visitantes en clientes. Especialidad en landing pages, anuncios de Facebook/Google y emails.', 'redaccion', 150000.00, '3 días', '["Copy para landing page", "Variantes A/B", "CTA optimizados", "Headlines"]', '', 'publicado', '2026-03-25 04:36:04.645752+00', '2026-03-25 04:36:04.645761+00', 'd69af16e-445a-45bb-ad6f-dda581312cf1');


--
-- Data for Name: publicaciones_imagenpublicacion; Type: TABLE DATA; Schema: public; Owner: marketplace
--



--
-- Data for Name: usuarios_perfil; Type: TABLE DATA; Schema: public; Owner: marketplace
--

INSERT INTO public.usuarios_perfil VALUES ('588f42a3-f65c-49e3-b307-0dae13f4a01e', '316 106 95 69', 'Diseñadora gráfica con más de 5 años de experiencia en branding y UI/UX. Apasionada por crear experiencias visuales memorables.', 'https://portafolio.example.com/maría', 'freelancer', '', '19b9c0fd-7308-42fd-ac7b-23a0843ff478');
INSERT INTO public.usuarios_perfil VALUES ('05b25a96-7f6d-4a4a-983c-83eca8d3f286', '57 327 028 30 16', 'Desarrollador full-stack especializado en Python y React. Me encanta construir productos digitales escalables y bien diseñados.', 'https://portafolio.example.com/carlos', 'freelancer', '', 'e91dafde-3520-40cd-acde-30928b06f11e');
INSERT INTO public.usuarios_perfil VALUES ('77ef140f-39b8-4ff6-81bc-2cf4a157111e', '573198538688', 'Especialista en marketing digital y estrategia de contenido. Ayudo a empresas a crecer su presencia online de forma orgánica.', 'https://portafolio.example.com/ana', 'freelancer', '', 'b844f358-2ddf-4bd1-9836-cd51ace66c91');
INSERT INTO public.usuarios_perfil VALUES ('92fda56b-be2c-4e99-af51-04aa68f69815', '57 327 781 81 02', 'Ingeniero de software con enfoque en arquitectura cloud y DevOps. Experiencia en AWS, Docker y CI/CD.', 'https://portafolio.example.com/jorge', 'ambos', '', 'c907698d-1857-4f9d-b29f-2fb82b5f6c93');
INSERT INTO public.usuarios_perfil VALUES ('679d5574-b4a7-426c-95b6-afa2b20ca1d9', '1406372', 'Redactora creativa y copywriter freelance. Transformo ideas complejas en textos claros que conectan con la audiencia.', 'https://portafolio.example.com/laura', 'freelancer', '', 'd69af16e-445a-45bb-ad6f-dda581312cf1');
INSERT INTO public.usuarios_perfil VALUES ('57ef4ed9-2fa3-42a2-a410-298222611123', '573047313981', 'Editor de video y motion designer. Creo contenido audiovisual para marcas, startups y creadores de contenido.', 'https://portafolio.example.com/david', 'ambos', '', 'f785047c-a67f-4447-aef5-aed3339f8470');
INSERT INTO public.usuarios_perfil VALUES ('297a569d-ce26-494b-8f36-9f4add4e1f78', '(+57)3082189600', 'Emprendedora digital buscando talento para proyectos de e-commerce y aplicaciones móviles.', 'https://portafolio.example.com/camila', 'cliente', '', 'f620541f-0531-4132-94ae-c438c2552a3e');
INSERT INTO public.usuarios_perfil VALUES ('61d2dff3-3335-4f15-b72e-026f281ff9dd', '+57 328 549 10 32', 'Product manager con experiencia en startups tech. Busco freelancers para proyectos de desarrollo y diseño.', 'https://portafolio.example.com/andrés', 'cliente', '', 'b1bc267f-c7d1-48e8-a2a2-97719fa62c0c');


--
-- Data for Name: usuarios_experiencia; Type: TABLE DATA; Schema: public; Owner: marketplace
--

INSERT INTO public.usuarios_experiencia VALUES ('fd47374c-fdf1-40e5-ae57-92bdd82b1a68', 'MercadoLibre', 'Frontend Developer', 'Beatae dolor illo perferendis nobis nobis deserunt iste. Ducimus soluta quasi ab facere molestias omnis. Amet earum doloribus placeat beatae.', '2020-04-01', NULL, 'Buenos Aires, Argentina', '588f42a3-f65c-49e3-b307-0dae13f4a01e');
INSERT INTO public.usuarios_experiencia VALUES ('727642d6-5a9a-43e3-89be-34f6a75d6d0d', 'Globant', 'Diseñadora UI/UX Senior', 'Quos non quos eum. Aliquid ipsum deserunt voluptatum maxime recusandae vitae. Id placeat deserunt.', '2019-11-01', '2020-07-27', 'Bogotá, Colombia', '588f42a3-f65c-49e3-b307-0dae13f4a01e');
INSERT INTO public.usuarios_experiencia VALUES ('f3ffda20-d764-44e6-89d9-409b04ba30f8', 'Freelance', 'Copywriter', 'Eos deserunt dolore tempore rem asperiores ut. Voluptatem debitis atque impedit maxime culpa. Occaecati quibusdam sit sapiente praesentium.', '2023-07-01', NULL, 'Medellín, Colombia', '588f42a3-f65c-49e3-b307-0dae13f4a01e');
INSERT INTO public.usuarios_experiencia VALUES ('7416fc4f-6a1e-4cd7-a492-f20b0f69ea5d', 'Platzi', 'Backend Developer', 'Dolor amet beatae maiores aliquam culpa. Laborum suscipit nam maiores possimus ipsum voluptatibus fugiat.', '2020-09-01', '2021-09-19', 'Remoto', '05b25a96-7f6d-4a4a-983c-83eca8d3f286');
INSERT INTO public.usuarios_experiencia VALUES ('4eab1194-2dd8-4527-8c0f-7b07da65098a', 'Google', 'Software Engineer Intern', 'Ad inventore pariatur unde autem tempore error. Excepturi doloribus quaerat voluptates id temporibus vitae placeat. Libero dolore illum quas.', '2020-08-01', '2021-02-03', 'Mountain View, USA', '77ef140f-39b8-4ff6-81bc-2cf4a157111e');
INSERT INTO public.usuarios_experiencia VALUES ('8814adf8-ccaf-4c2d-9019-dec808ef46aa', 'Bancolombia', 'Analista de datos', 'Consequuntur iste dicta voluptatibus. Tempore praesentium eaque deserunt laboriosam nisi. Esse iusto blanditiis excepturi sunt expedita natus.', '2020-12-01', '2022-03-10', 'Medellín, Colombia', '77ef140f-39b8-4ff6-81bc-2cf4a157111e');
INSERT INTO public.usuarios_experiencia VALUES ('4f735335-5c0e-434b-b1bf-8c38c064feed', 'Nequi', 'Product Manager', 'Accusantium quidem atque. Est ut animi harum.', '2020-04-01', '2021-09-07', 'Bogotá, Colombia', '77ef140f-39b8-4ff6-81bc-2cf4a157111e');
INSERT INTO public.usuarios_experiencia VALUES ('7cc86843-ad94-4f1e-b015-382d77a563bf', 'MercadoLibre', 'Frontend Developer', 'Ab aliquid sed similique. Magnam vero corporis inventore hic possimus.', '2022-02-01', '2023-07-18', 'Buenos Aires, Argentina', '92fda56b-be2c-4e99-af51-04aa68f69815');
INSERT INTO public.usuarios_experiencia VALUES ('736cd229-30b3-4078-900b-714e1e1aecb1', 'Freelance', 'Copywriter', 'Quis ullam quibusdam rerum. Velit accusamus consequuntur ipsum cupiditate quos beatae. Reiciendis atque architecto unde tempore. Reprehenderit odit provident.', '2023-02-01', '2024-08-21', 'Medellín, Colombia', '679d5574-b4a7-426c-95b6-afa2b20ca1d9');
INSERT INTO public.usuarios_experiencia VALUES ('4cf1ece4-bb11-4893-ab8b-1fd66060bf7f', 'Globant', 'Diseñadora UI/UX Senior', 'Molestiae consequatur consequuntur minima quasi. Minima dolore voluptatem magni labore sed.', '2019-09-01', NULL, 'Bogotá, Colombia', '679d5574-b4a7-426c-95b6-afa2b20ca1d9');
INSERT INTO public.usuarios_experiencia VALUES ('f1d5948b-92ef-46fb-84d8-f45e5599ef55', 'Zemoga', 'Full Stack Developer', 'Nostrum eligendi ratione ipsam. Ducimus at ullam optio quis aut necessitatibus.', '2024-10-01', '2026-04-04', 'Barranquilla, Colombia', '679d5574-b4a7-426c-95b6-afa2b20ca1d9');
INSERT INTO public.usuarios_experiencia VALUES ('f1f3ffb0-bf79-4038-a348-3dcd9edf15ba', 'Platzi', 'Backend Developer', 'Dolore delectus ut quaerat possimus neque officiis. Ut voluptas praesentium sapiente.', '2024-04-01', '2024-12-18', 'Remoto', '57ef4ed9-2fa3-42a2-a410-298222611123');
INSERT INTO public.usuarios_experiencia VALUES ('f9b38d99-c790-413b-ac11-e97d890f498d', 'MercadoLibre', 'Frontend Developer', 'At perspiciatis fugit nisi atque nemo. Eius necessitatibus occaecati odio excepturi. In porro praesentium quis omnis quidem odit.', '2020-02-01', '2021-11-06', 'Buenos Aires, Argentina', '57ef4ed9-2fa3-42a2-a410-298222611123');
INSERT INTO public.usuarios_experiencia VALUES ('b7d80459-4802-4ade-bdc9-f4e2010bf472', 'Globant', 'Diseñadora UI/UX Senior', 'Tempora sed illum facilis eligendi. Eos fugiat voluptatum non eius non maiores occaecati. Quibusdam quaerat explicabo sunt ipsam illo.', '2024-06-01', NULL, 'Bogotá, Colombia', '57ef4ed9-2fa3-42a2-a410-298222611123');
INSERT INTO public.usuarios_experiencia VALUES ('248016c6-53ba-4c9b-9217-dc30320c74e3', 'Platzi', 'Backend Developer', 'Quidem exercitationem maiores blanditiis pariatur quas quisquam vitae. Aut excepturi amet eum molestias illum id.', '2021-12-01', '2022-08-11', 'Remoto', '297a569d-ce26-494b-8f36-9f4add4e1f78');
INSERT INTO public.usuarios_experiencia VALUES ('80b7e10d-c86d-40b5-8482-2bbb9befd974', 'Google', 'Software Engineer Intern', 'Blanditiis culpa molestiae voluptate debitis dolores consectetur.', '2023-11-01', NULL, 'Mountain View, USA', '297a569d-ce26-494b-8f36-9f4add4e1f78');
INSERT INTO public.usuarios_experiencia VALUES ('46648ae6-1fa1-4589-90c6-b656366aa9ab', 'Platzi', 'Backend Developer', 'Dolore debitis ratione totam aspernatur. Perspiciatis error distinctio rem magnam minima vitae corporis.', '2022-05-01', '2023-06-09', 'Remoto', '61d2dff3-3335-4f15-b72e-026f281ff9dd');
INSERT INTO public.usuarios_experiencia VALUES ('7f72becf-6a73-4162-93f5-cb989a50ff26', 'Rappi', 'Content Strategist', 'Itaque itaque deleniti asperiores voluptate id. Aperiam in incidunt asperiores reprehenderit quasi iure. Corrupti deleniti saepe debitis.', '2024-06-01', '2025-01-24', 'Bogotá, Colombia', '61d2dff3-3335-4f15-b72e-026f281ff9dd');
INSERT INTO public.usuarios_experiencia VALUES ('90328aea-ffaf-4b4f-8ff9-3d37c979471c', 'Zemoga', 'Full Stack Developer', 'Dicta suscipit sed. In eius exercitationem illum iusto. Laudantium commodi impedit eaque alias consequuntur.', '2020-01-01', '2021-08-13', 'Barranquilla, Colombia', '61d2dff3-3335-4f15-b72e-026f281ff9dd');


--
-- Data for Name: usuarios_habilidad; Type: TABLE DATA; Schema: public; Owner: marketplace
--

INSERT INTO public.usuarios_habilidad VALUES ('fd059f29-a222-4698-94d5-72b8607b85e0', 'Python');
INSERT INTO public.usuarios_habilidad VALUES ('7ced7aa9-34f1-4fc8-8b06-e4e0aacd0ccb', 'JavaScript');
INSERT INTO public.usuarios_habilidad VALUES ('a9baf523-7cff-440b-a028-39e17d8c6fa4', 'TypeScript');
INSERT INTO public.usuarios_habilidad VALUES ('480235ae-710e-4c92-8810-9aba7e9c85ab', 'React');
INSERT INTO public.usuarios_habilidad VALUES ('fa174867-02b8-45c8-aae8-a904287e0a26', 'Next.js');
INSERT INTO public.usuarios_habilidad VALUES ('25a50c17-a0fa-4311-8da3-7b34b33789bb', 'Django');
INSERT INTO public.usuarios_habilidad VALUES ('ceeca115-72a6-4857-b5b6-bc4a4eccb836', 'Node.js');
INSERT INTO public.usuarios_habilidad VALUES ('c4f14efa-a9d1-4646-9a11-d792232a681b', 'PostgreSQL');
INSERT INTO public.usuarios_habilidad VALUES ('3d0adb74-1602-4097-ad17-00ae4c814bcf', 'MongoDB');
INSERT INTO public.usuarios_habilidad VALUES ('c5fef664-9993-47b1-9f64-64c9b3d69a80', 'Docker');
INSERT INTO public.usuarios_habilidad VALUES ('55098eaf-2ce3-468d-852c-25813a7f8a0e', 'AWS');
INSERT INTO public.usuarios_habilidad VALUES ('e1e1b4ad-1638-4c0a-852e-b532673a1d93', 'Git');
INSERT INTO public.usuarios_habilidad VALUES ('a27a0e35-ff72-4bdd-b871-4b29a7887cfc', 'Figma');
INSERT INTO public.usuarios_habilidad VALUES ('a456e8d2-cd59-4835-869f-b14fe074d497', 'Adobe Photoshop');
INSERT INTO public.usuarios_habilidad VALUES ('c0acfba1-c3bb-4606-9618-36413f289937', 'Adobe Illustrator');
INSERT INTO public.usuarios_habilidad VALUES ('24092544-c48a-4d9b-8753-d1e8f0361d36', 'UI/UX Design');
INSERT INTO public.usuarios_habilidad VALUES ('3f49077d-3393-4113-b7d1-e2ecd7dd8fe2', 'SEO');
INSERT INTO public.usuarios_habilidad VALUES ('e2890e17-c960-4dfe-ad15-563ec496f916', 'Google Analytics');
INSERT INTO public.usuarios_habilidad VALUES ('b8c852f8-2b97-4316-a21a-158b547301e6', 'Content Marketing');
INSERT INTO public.usuarios_habilidad VALUES ('c4a2f418-5946-47d2-b177-77d7c2bc4441', 'Copywriting');
INSERT INTO public.usuarios_habilidad VALUES ('0af2036b-7dd3-4bfb-835a-83d1342491f1', 'Video Editing');
INSERT INTO public.usuarios_habilidad VALUES ('586cb32b-8f4a-405f-8fa2-806e505293b9', 'Motion Graphics');
INSERT INTO public.usuarios_habilidad VALUES ('6b2c3284-70b9-4ca9-96b7-f86785f7103f', '3D Modeling');
INSERT INTO public.usuarios_habilidad VALUES ('53944a37-b1a4-4707-9ee8-a593ab4e376d', 'Blender');
INSERT INTO public.usuarios_habilidad VALUES ('a8f069ef-3e8d-4746-88c0-0d6ef8aec72c', 'Project Management');
INSERT INTO public.usuarios_habilidad VALUES ('b8dfb57e-4e89-45c5-8787-a3e9c04bbbb4', 'Scrum');
INSERT INTO public.usuarios_habilidad VALUES ('bcd61c6c-2582-45d2-9429-05ad8222a8c4', 'Agile');
INSERT INTO public.usuarios_habilidad VALUES ('f2b218c9-ada8-4c75-a63c-36009d17db4d', 'Data Analysis');
INSERT INTO public.usuarios_habilidad VALUES ('56255ff2-7c32-4804-8bac-0b24d30043dd', 'Machine Learning');
INSERT INTO public.usuarios_habilidad VALUES ('baeccaf8-beaf-48ef-b80a-c8815546406c', 'TensorFlow');
INSERT INTO public.usuarios_habilidad VALUES ('72fb1fe2-a3f2-4ff2-b845-2bf114dea745', 'Power BI');
INSERT INTO public.usuarios_habilidad VALUES ('dd494f75-dd58-497e-ad85-95180684ef2a', 'Excel Avanzado');
INSERT INTO public.usuarios_habilidad VALUES ('4fc2d7c3-770a-4593-925c-52389ba757f8', 'Redacción Creativa');
INSERT INTO public.usuarios_habilidad VALUES ('9bb06922-e0cf-44e4-a168-a1c2332e72b8', 'Traducción');
INSERT INTO public.usuarios_habilidad VALUES ('f9d788fc-f7ad-463a-aca5-c38f8e7e92c3', 'Community Management');
INSERT INTO public.usuarios_habilidad VALUES ('69a108bc-e369-45ff-95b0-37e037a0b4c2', 'Email Marketing');
INSERT INTO public.usuarios_habilidad VALUES ('4a284962-b745-42b2-8b4a-e0d71ddf74cc', 'Google Ads');
INSERT INTO public.usuarios_habilidad VALUES ('1294aedd-6a79-4a71-9808-fcb09d676e53', 'Facebook Ads');
INSERT INTO public.usuarios_habilidad VALUES ('42d58c88-aa11-44de-a6a0-2b3f3d860979', 'WordPress');
INSERT INTO public.usuarios_habilidad VALUES ('e71c07a6-7a03-4ce3-9d8a-0bdbd4866106', 'Shopify');
INSERT INTO public.usuarios_habilidad VALUES ('288d34a1-e123-4b6b-aae9-2e7a62f3d5ee', 'Flutter');
INSERT INTO public.usuarios_habilidad VALUES ('f62f16f5-0c59-45bc-8a8b-8f4b07916c62', 'Swift');
INSERT INTO public.usuarios_habilidad VALUES ('fbeac4a9-5c5f-4cbf-8dee-dee60fb2d6b1', 'Kotlin');
INSERT INTO public.usuarios_habilidad VALUES ('6636018f-c0d9-4e6b-a4d3-1db368005748', 'Java');
INSERT INTO public.usuarios_habilidad VALUES ('6094fbe4-5297-405f-867a-18c269a0353e', 'C#');
INSERT INTO public.usuarios_habilidad VALUES ('93dece1d-bd5c-4332-ad43-3ebc5f492d00', 'Unity');
INSERT INTO public.usuarios_habilidad VALUES ('da675d40-ed48-427a-b1b9-83620bf391aa', 'Unreal Engine');
INSERT INTO public.usuarios_habilidad VALUES ('47383211-9373-4c90-b52c-19b993130b08', 'Cybersecurity');
INSERT INTO public.usuarios_habilidad VALUES ('84d343b2-c6e4-4cbc-9e07-3d917cc58f83', 'DevOps');
INSERT INTO public.usuarios_habilidad VALUES ('b44f2734-eb7c-4367-8095-f8228ffa2c80', 'Linux');
INSERT INTO public.usuarios_habilidad VALUES ('a77b4354-ac50-4025-8090-d24c1376f74b', 'Go');
INSERT INTO public.usuarios_habilidad VALUES ('e7d45193-f17c-488a-bc5b-6af8fd517172', 'Rust');
INSERT INTO public.usuarios_habilidad VALUES ('41744c32-a397-4b9b-aa0f-ff1ed13208a0', 'Vue.js');
INSERT INTO public.usuarios_habilidad VALUES ('907e0da1-ad48-43ff-bae5-10497465408b', 'Angular');
INSERT INTO public.usuarios_habilidad VALUES ('49d68daf-44c2-480f-b644-9455b87a2ba4', 'Tailwind CSS');
INSERT INTO public.usuarios_habilidad VALUES ('54c7aa6e-e8f2-484d-a099-c995f09abc38', 'GraphQL');
INSERT INTO public.usuarios_habilidad VALUES ('8cb2e183-a61d-45d8-a760-e16633d9b3eb', 'REST APIs');
INSERT INTO public.usuarios_habilidad VALUES ('28cccb45-47fa-4392-a488-2ec6e437bc35', 'Firebase');
INSERT INTO public.usuarios_habilidad VALUES ('b34e055f-815c-495b-8549-708c4c0f8c1b', 'Supabase');
INSERT INTO public.usuarios_habilidad VALUES ('a314da5d-8176-454c-bb44-e18ff71b5941', 'Redis');


--
-- Data for Name: usuarios_perfil_habilidades; Type: TABLE DATA; Schema: public; Owner: marketplace
--

INSERT INTO public.usuarios_perfil_habilidades VALUES (1, '588f42a3-f65c-49e3-b307-0dae13f4a01e', 'a456e8d2-cd59-4835-869f-b14fe074d497');
INSERT INTO public.usuarios_perfil_habilidades VALUES (2, '588f42a3-f65c-49e3-b307-0dae13f4a01e', 'a27a0e35-ff72-4bdd-b871-4b29a7887cfc');
INSERT INTO public.usuarios_perfil_habilidades VALUES (3, '588f42a3-f65c-49e3-b307-0dae13f4a01e', 'c0acfba1-c3bb-4606-9618-36413f289937');
INSERT INTO public.usuarios_perfil_habilidades VALUES (4, '588f42a3-f65c-49e3-b307-0dae13f4a01e', '49d68daf-44c2-480f-b644-9455b87a2ba4');
INSERT INTO public.usuarios_perfil_habilidades VALUES (5, '588f42a3-f65c-49e3-b307-0dae13f4a01e', '24092544-c48a-4d9b-8753-d1e8f0361d36');
INSERT INTO public.usuarios_perfil_habilidades VALUES (6, '05b25a96-7f6d-4a4a-983c-83eca8d3f286', 'c4f14efa-a9d1-4646-9a11-d792232a681b');
INSERT INTO public.usuarios_perfil_habilidades VALUES (7, '05b25a96-7f6d-4a4a-983c-83eca8d3f286', 'fd059f29-a222-4698-94d5-72b8607b85e0');
INSERT INTO public.usuarios_perfil_habilidades VALUES (8, '05b25a96-7f6d-4a4a-983c-83eca8d3f286', 'a9baf523-7cff-440b-a028-39e17d8c6fa4');
INSERT INTO public.usuarios_perfil_habilidades VALUES (9, '05b25a96-7f6d-4a4a-983c-83eca8d3f286', '25a50c17-a0fa-4311-8da3-7b34b33789bb');
INSERT INTO public.usuarios_perfil_habilidades VALUES (10, '05b25a96-7f6d-4a4a-983c-83eca8d3f286', '480235ae-710e-4c92-8810-9aba7e9c85ab');
INSERT INTO public.usuarios_perfil_habilidades VALUES (11, '05b25a96-7f6d-4a4a-983c-83eca8d3f286', 'c5fef664-9993-47b1-9f64-64c9b3d69a80');
INSERT INTO public.usuarios_perfil_habilidades VALUES (12, '77ef140f-39b8-4ff6-81bc-2cf4a157111e', 'e2890e17-c960-4dfe-ad15-563ec496f916');
INSERT INTO public.usuarios_perfil_habilidades VALUES (13, '77ef140f-39b8-4ff6-81bc-2cf4a157111e', '1294aedd-6a79-4a71-9808-fcb09d676e53');
INSERT INTO public.usuarios_perfil_habilidades VALUES (14, '77ef140f-39b8-4ff6-81bc-2cf4a157111e', 'b8c852f8-2b97-4316-a21a-158b547301e6');
INSERT INTO public.usuarios_perfil_habilidades VALUES (15, '77ef140f-39b8-4ff6-81bc-2cf4a157111e', '3f49077d-3393-4113-b7d1-e2ecd7dd8fe2');
INSERT INTO public.usuarios_perfil_habilidades VALUES (16, '77ef140f-39b8-4ff6-81bc-2cf4a157111e', '4a284962-b745-42b2-8b4a-e0d71ddf74cc');
INSERT INTO public.usuarios_perfil_habilidades VALUES (17, '92fda56b-be2c-4e99-af51-04aa68f69815', 'a77b4354-ac50-4025-8090-d24c1376f74b');
INSERT INTO public.usuarios_perfil_habilidades VALUES (18, '92fda56b-be2c-4e99-af51-04aa68f69815', 'fd059f29-a222-4698-94d5-72b8607b85e0');
INSERT INTO public.usuarios_perfil_habilidades VALUES (19, '92fda56b-be2c-4e99-af51-04aa68f69815', '84d343b2-c6e4-4cbc-9e07-3d917cc58f83');
INSERT INTO public.usuarios_perfil_habilidades VALUES (20, '92fda56b-be2c-4e99-af51-04aa68f69815', 'b44f2734-eb7c-4367-8095-f8228ffa2c80');
INSERT INTO public.usuarios_perfil_habilidades VALUES (21, '92fda56b-be2c-4e99-af51-04aa68f69815', '55098eaf-2ce3-468d-852c-25813a7f8a0e');
INSERT INTO public.usuarios_perfil_habilidades VALUES (22, '92fda56b-be2c-4e99-af51-04aa68f69815', 'c5fef664-9993-47b1-9f64-64c9b3d69a80');
INSERT INTO public.usuarios_perfil_habilidades VALUES (23, '679d5574-b4a7-426c-95b6-afa2b20ca1d9', '9bb06922-e0cf-44e4-a168-a1c2332e72b8');
INSERT INTO public.usuarios_perfil_habilidades VALUES (24, '679d5574-b4a7-426c-95b6-afa2b20ca1d9', 'c4a2f418-5946-47d2-b177-77d7c2bc4441');
INSERT INTO public.usuarios_perfil_habilidades VALUES (25, '679d5574-b4a7-426c-95b6-afa2b20ca1d9', '4fc2d7c3-770a-4593-925c-52389ba757f8');
INSERT INTO public.usuarios_perfil_habilidades VALUES (26, '679d5574-b4a7-426c-95b6-afa2b20ca1d9', '3f49077d-3393-4113-b7d1-e2ecd7dd8fe2');
INSERT INTO public.usuarios_perfil_habilidades VALUES (27, '679d5574-b4a7-426c-95b6-afa2b20ca1d9', '42d58c88-aa11-44de-a6a0-2b3f3d860979');
INSERT INTO public.usuarios_perfil_habilidades VALUES (28, '57ef4ed9-2fa3-42a2-a410-298222611123', '586cb32b-8f4a-405f-8fa2-806e505293b9');
INSERT INTO public.usuarios_perfil_habilidades VALUES (29, '57ef4ed9-2fa3-42a2-a410-298222611123', 'a456e8d2-cd59-4835-869f-b14fe074d497');
INSERT INTO public.usuarios_perfil_habilidades VALUES (30, '57ef4ed9-2fa3-42a2-a410-298222611123', '0af2036b-7dd3-4bfb-835a-83d1342491f1');
INSERT INTO public.usuarios_perfil_habilidades VALUES (31, '57ef4ed9-2fa3-42a2-a410-298222611123', 'a27a0e35-ff72-4bdd-b871-4b29a7887cfc');
INSERT INTO public.usuarios_perfil_habilidades VALUES (32, '57ef4ed9-2fa3-42a2-a410-298222611123', '53944a37-b1a4-4707-9ee8-a593ab4e376d');
INSERT INTO public.usuarios_perfil_habilidades VALUES (33, '297a569d-ce26-494b-8f36-9f4add4e1f78', 'dd494f75-dd58-497e-ad85-95180684ef2a');
INSERT INTO public.usuarios_perfil_habilidades VALUES (34, '297a569d-ce26-494b-8f36-9f4add4e1f78', 'a8f069ef-3e8d-4746-88c0-0d6ef8aec72c');
INSERT INTO public.usuarios_perfil_habilidades VALUES (35, '297a569d-ce26-494b-8f36-9f4add4e1f78', 'b8dfb57e-4e89-45c5-8787-a3e9c04bbbb4');
INSERT INTO public.usuarios_perfil_habilidades VALUES (36, '297a569d-ce26-494b-8f36-9f4add4e1f78', 'bcd61c6c-2582-45d2-9429-05ad8222a8c4');
INSERT INTO public.usuarios_perfil_habilidades VALUES (37, '61d2dff3-3335-4f15-b72e-026f281ff9dd', 'f2b218c9-ada8-4c75-a63c-36009d17db4d');
INSERT INTO public.usuarios_perfil_habilidades VALUES (38, '61d2dff3-3335-4f15-b72e-026f281ff9dd', 'a8f069ef-3e8d-4746-88c0-0d6ef8aec72c');
INSERT INTO public.usuarios_perfil_habilidades VALUES (39, '61d2dff3-3335-4f15-b72e-026f281ff9dd', 'b8dfb57e-4e89-45c5-8787-a3e9c04bbbb4');
INSERT INTO public.usuarios_perfil_habilidades VALUES (40, '61d2dff3-3335-4f15-b72e-026f281ff9dd', '72fb1fe2-a3f2-4ff2-b845-2bf114dea745');


--
-- Data for Name: usuarios_usuario_groups; Type: TABLE DATA; Schema: public; Owner: marketplace
--



--
-- Data for Name: usuarios_usuario_user_permissions; Type: TABLE DATA; Schema: public; Owner: marketplace
--



--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: marketplace
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: marketplace
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: marketplace
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 44, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: marketplace
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: marketplace
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 11, true);


--
-- Name: usuarios_perfil_habilidades_id_seq; Type: SEQUENCE SET; Schema: public; Owner: marketplace
--

SELECT pg_catalog.setval('public.usuarios_perfil_habilidades_id_seq', 40, true);


--
-- Name: usuarios_usuario_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: marketplace
--

SELECT pg_catalog.setval('public.usuarios_usuario_groups_id_seq', 1, false);


--
-- Name: usuarios_usuario_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: marketplace
--

SELECT pg_catalog.setval('public.usuarios_usuario_user_permissions_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--


