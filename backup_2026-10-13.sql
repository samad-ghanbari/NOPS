--
-- PostgreSQL database dump
--

\restrict 5IPC1QGA7O23m08c5ak2iBZ3jRP9jf6uwdY8YQvFiXnCrhisFGf0v5C2SEXMjDd

-- Dumped from database version 18.4 (Debian 18.4-1.pgdg13+1)
-- Dumped by pg_dump version 18.6 (Ubuntu 18.6-1.pgdg24.04+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: web_admin
--

INSERT INTO public._prisma_migrations VALUES ('48b989f7-7d07-40e1-ac0a-c76d42bfa5bd', 'fd82e89bdefdacc33b816ee7244146b795256d4578ab4f4c3f9986e452058035', '2026-09-27 17:29:22.134929+00', '20260828074915_update_db', NULL, NULL, '2026-09-27 17:29:22.114008+00', 1);
INSERT INTO public._prisma_migrations VALUES ('86be7dd8-4ed9-49c7-8b15-642ad7b58cef', '6aa90508bcebda6a1d663b5eef6a67a203707d50594cea1a82209160f528e5a2', '2026-09-27 17:29:22.140038+00', '20260828084923_device_role', NULL, NULL, '2026-09-27 17:29:22.135488+00', 1);
INSERT INTO public._prisma_migrations VALUES ('42f9ddd5-fcb0-46e0-bafb-1afd6ed0d460', '6e229fe608df242241975ea29755b976c2c11416bf259278537c619eeb8938d4', '2026-09-27 17:29:22.14217+00', '20260828125617_update_devices', NULL, NULL, '2026-09-27 17:29:22.140468+00', 1);
INSERT INTO public._prisma_migrations VALUES ('95cb68b7-8b80-44eb-831b-3a58ee9abc36', 'a1e3ec2a1d298d89ac59b2f3f9dab48b6f0b935f5fd02407f88715b383dd16ce', '2026-09-27 17:30:15.841807+00', '20260927173015_device_type_update', NULL, NULL, '2026-09-27 17:30:15.832063+00', 1);
INSERT INTO public._prisma_migrations VALUES ('5df6a431-7068-40c3-8457-a618a366698b', 'fd82e89bdefdacc33b816ee7244146b795256d4578ab4f4c3f9986e452058035', '2026-08-28 12:55:53.174464+00', '20260828074915_update_db', NULL, NULL, '2026-08-28 12:55:53.156579+00', 1);
INSERT INTO public._prisma_migrations VALUES ('6f921bd3-d144-4217-894c-151fce3031e0', '6aa90508bcebda6a1d663b5eef6a67a203707d50594cea1a82209160f528e5a2', '2026-08-28 12:55:53.180059+00', '20260828084923_device_role', NULL, NULL, '2026-08-28 12:55:53.175057+00', 1);
INSERT INTO public._prisma_migrations VALUES ('967c1428-4c90-4698-a4c5-14d3b53e012e', '6e229fe608df242241975ea29755b976c2c11416bf259278537c619eeb8938d4', '2026-08-28 12:56:17.153772+00', '20260828125617_update_devices', NULL, NULL, '2026-08-28 12:56:17.151493+00', 1);
INSERT INTO public._prisma_migrations VALUES ('a8062798-91b0-431a-ba1e-bdfb7cb8fab1', 'fd82e89bdefdacc33b816ee7244146b795256d4578ab4f4c3f9986e452058035', '2026-08-28 08:49:16.814024+00', '20260828074915_update_db', NULL, NULL, '2026-08-28 08:49:16.799221+00', 1);
INSERT INTO public._prisma_migrations VALUES ('e451261e-6825-48c7-9061-f8df71b4cf66', '6aa90508bcebda6a1d663b5eef6a67a203707d50594cea1a82209160f528e5a2', '2026-08-28 08:49:23.931523+00', '20260828084923_device_role', NULL, NULL, '2026-08-28 08:49:23.927015+00', 1);
INSERT INTO public._prisma_migrations VALUES ('f02bafce-cbd6-4c43-bdff-7cb3f3d320a9', 'fd82e89bdefdacc33b816ee7244146b795256d4578ab4f4c3f9986e452058035', '2026-08-24 12:12:55.65961+00', '20260824121255_init', NULL, NULL, '2026-08-24 12:12:55.502694+00', 1);


--
-- Data for Name: device_role; Type: TABLE DATA; Schema: public; Owner: web_admin
--

INSERT INTO public.device_role VALUES ('01a04794-c6d5-74d8-9d78-69492585fa1a', '01a02006-1b19-73cc-88bd-fec97b5b3bbc', 'Core');
INSERT INTO public.device_role VALUES ('01a0479a-2781-761f-8625-e1364de298ab', '01a02006-1b19-73cc-88bd-fec97b5b3bbc', 'Metro-Agg');
INSERT INTO public.device_role VALUES ('01a0479a-62f9-770c-8662-eaa17296b572', '01a02006-1b19-73cc-88bd-fec97b5b3bbc', 'Access');
INSERT INTO public.device_role VALUES ('01a0479b-0b70-704d-b908-6467003db03d', '01a02006-1b19-73cc-88bd-fec97b5b3bbc', '650k-Agg');
INSERT INTO public.device_role VALUES ('01a0479b-aa46-7360-88f8-c3458706f16e', '01a02006-1b19-73cc-88bd-fec97b5b3bbc', 'Bras');


--
-- Data for Name: provinces; Type: TABLE DATA; Schema: public; Owner: web_admin
--

INSERT INTO public.provinces VALUES ('01a02006-1b19-73cc-88bd-fec97b5b3bbc', 'تهران', 1);
INSERT INTO public.provinces VALUES ('01a02006-7ca1-751d-9fa7-f12ddd0f2a40', 'البرز', 2);
INSERT INTO public.provinces VALUES ('01a02075-af08-77fb-b036-b6210927a426', 'شیراز', 5);
INSERT INTO public.provinces VALUES ('01a02006-c93e-76b7-a5e2-b4e7b59b53c0', 'آذربایجان شرقی', 3);
INSERT INTO public.provinces VALUES ('01a02007-1617-7658-a812-c33b5114f7aa', 'آذربایجان غربی', 4);
INSERT INTO public.provinces VALUES ('01a0207a-04a9-7038-938b-fa9831ee8d34', 'اصفهان', 6);


--
-- Data for Name: devices; Type: TABLE DATA; Schema: public; Owner: web_admin
--

INSERT INTO public.devices VALUES ('01a0479d-cb64-77ec-8edb-79a01ac3443d', '01a02006-1b19-73cc-88bd-fec97b5b3bbc', '2-BA-CX600X16', 'huawei', 'VRP', '172.31.0.11', 'tct-tarh-ghanbari', '01a0479a-62f9-770c-8662-eaa17296b572');
INSERT INTO public.devices VALUES ('01a047a1-ff8f-766a-8e44-dbf7b92547f8', '01a02006-1b19-73cc-88bd-fec97b5b3bbc', '2-PA-CX600X16', 'huawei', 'VRP', '172.31.0.12', 'tct-tarh-ghanbari', '01a0479a-62f9-770c-8662-eaa17296b572');
INSERT INTO public.devices VALUES ('01a047a5-3284-7116-be8c-9f1fbd9511d4', '01a02006-1b19-73cc-88bd-fec97b5b3bbc', '2-BA-NE40X16', 'huawei', 'VRP', '172.31.0.20', 'tct-tarh-ghanbari', '01a0479a-2781-761f-8625-e1364de298ab');
INSERT INTO public.devices VALUES ('01a047a5-c229-7628-b1e2-ab155e406ce3', '01a02006-1b19-73cc-88bd-fec97b5b3bbc', '2-BA-NE5000X16', 'huawei', 'VRP', '172.31.0.1', 'tct-tarh-ghanbari', '01a04794-c6d5-74d8-9d78-69492585fa1a');


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: web_admin
--

INSERT INTO public.groups VALUES ('01a04974-b6f3-70aa-9af5-007f90bdfca1', '01a02006-1b19-73cc-88bd-fec97b5b3bbc', 'Metro-Access', 'huawei', 'VRP', 3, 'router');
INSERT INTO public.groups VALUES ('01a02aca-0a24-723a-bf63-437c086d071e', '01a02006-1b19-73cc-88bd-fec97b5b3bbc', 'Metro-NE40X16', 'huawei', 'NXOS', 1, 'router');
INSERT INTO public.groups VALUES ('01a02ab9-4a35-75ee-9f8c-8915fd9e2abf', '01a02006-1b19-73cc-88bd-fec97b5b3bbc', 'Metro-CX600X16', 'huawei', 'NXOS', 2, 'router');


--
-- Data for Name: device_group; Type: TABLE DATA; Schema: public; Owner: web_admin
--

INSERT INTO public.device_group VALUES ('01a04878-02be-74f7-8655-f30b359e8a2b', '01a0479d-cb64-77ec-8edb-79a01ac3443d', '01a02ab9-4a35-75ee-9f8c-8915fd9e2abf');
INSERT INTO public.device_group VALUES ('01a04878-44af-7468-ada7-11397baee5fc', '01a047a1-ff8f-766a-8e44-dbf7b92547f8', '01a02ab9-4a35-75ee-9f8c-8915fd9e2abf');
INSERT INTO public.device_group VALUES ('01a04879-41f8-72ba-9c71-d6ef60053803', '01a047a5-3284-7116-be8c-9f1fbd9511d4', '01a02aca-0a24-723a-bf63-437c086d071e');
INSERT INTO public.device_group VALUES ('01a04975-6b45-72fa-85b0-3f738aa355f2', '01a0479d-cb64-77ec-8edb-79a01ac3443d', '01a04974-b6f3-70aa-9af5-007f90bdfca1');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: web_admin
--

INSERT INTO public.users VALUES ('01a01fce-a35b-72d0-b872-2a52220b7d76', 'صمد', 'قنبری', '1', 'Male', '$2b$10$iY3PCNHKMzgCoKxkaiJrCuSIOb3nNF.e0fSct5xvHPzZDdJ3iZ/si', 'Admin', true, false, '2026-08-18 18:39:19.901');


--
-- PostgreSQL database dump complete
--

\unrestrict 5IPC1QGA7O23m08c5ak2iBZ3jRP9jf6uwdY8YQvFiXnCrhisFGf0v5C2SEXMjDd

