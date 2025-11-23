// src/pages/Admin/AdminApp.js
import {
	Admin,
	AppBar,
	ArrayField,
	BulkDeleteWithConfirmButton,
	Create,
	CreateButton,
	Datagrid,
	DateField,
	DeleteButton,
	Edit,
	EditButton,
	ExportButton,
	FunctionField,
	Layout,
	List,
	NumberInput,
	Resource,
	SaveButton,
	Show,
	SimpleForm,
	SimpleShowLayout,
	SingleFieldList,
	TextField,
	TextInput,
	TitlePortal,
	Toolbar,
	TopToolbar,
	useRecordContext,
	useRedirect,
	useResourceContext,
} from 'react-admin';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, useMediaQuery, Card, CardContent, Typography } from '@mui/material';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import frenchMessages from 'ra-language-french';
import { BsBoxSeam, BsReceipt, BsTag } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService';
import categoryApi from '../Category/services/Category.api';
import orderApi from '../Order/services/Order.api';

const customFrenchMessages = {
	...frenchMessages,
	ra: {
		...frenchMessages.ra,
		navigation: {
			...frenchMessages.ra.navigation,
			// Texte de la barre bleue : "x items selected"
			// (singulier |||| pluriel)
			bulk_actions: '%{smart_count} élément sélectionné |||| %{smart_count} éléments sélectionnés',
		},
		action: {
			...frenchMessages.ra.action,
			// Texte par défaut des boutons DELETE
			delete: 'SUPPRIMER',
		},
	},
};

const i18nProvider = polyglotI18nProvider(() => customFrenchMessages, 'fr');

// petit helper pour récupérer un id dans les payloads API Platform
const getId = (item) =>
	item.id ||
	item.id_produit ||
	item.id_categorie ||
	item.id_commande ||
	(item['@id'] ? item['@id'].split('/').pop() : undefined);

// helpers payload
const toStr = (v) => (v === undefined || v === null ? '' : String(v));

// on fabrique un payload PRODUIT "propre" pour ton back
// helpers payload
const buildProductCreatePayload = (data) => ({
	nom: data.nom ?? '',
	reference: data.reference ?? '',
	description: data.description ?? '',
	prix_ht: toStr(data.prix_ht) ?? '0',
	stock: data.stock ?? 0,
	// pour la création on met une cat et une tva par défaut
	categories: ['/api/categories/1'],
	tva: '/api/tvas/1',
});

const buildProductUpdatePayload = (data) => ({
	nom: data.nom ?? '',
	reference: data.reference ?? '',
	description: data.description ?? '',
	prix_ht: toStr(data.prix_ht) ?? '0',
	stock: data.stock ?? 0,
	// 🔴 surtout PAS categories / tva ici
});


// dataProvider
const dataProvider = {
	// LIST
	getList: async (resource, params) => {
		const { page, perPage } = params.pagination;
		const query = { page, itemsPerPage: perPage };

		let json;

		if (resource === 'categories') {
			json = await categoryApi.getAllCategories(query);
		} else if (resource === 'commandes') {
			json = await orderApi.getAllOrders(query);
		} else if (resource === 'produits') {
			// ICI on passe par ton apiService générique
			json = await apiService.find('produits', query);
		} else {
			json = await apiService.find(resource, query);
		}

		const members = json['hydra:member'] || json.data || [];

		const data = members.map((item) => ({
			id: getId(item),
			...item,
		}));

		return {
			data,
			total: json['hydra:totalItems'] ?? data.length,
		};
	},

	// ONE
	getOne: async (resource, params) => {
		let json;
		if (resource === 'categories') {
			json = await categoryApi.getCategoryById(params.id);
		} else if (resource === 'commandes') {
			json = await orderApi.getOrderById(params.id);
		} else if (resource === 'produits') {
			json = await apiService.get(`produits/${params.id}`);
		} else {
			json = await apiService.get(`${resource}/${params.id}`);
		}
		return { data: { id: getId(json), ...json } };
	},

	// CREATE
	create: async (resource, params) => {
		let json;
		if (resource === 'categories') {
			json = await categoryApi.createCategory(params.data);
		} else if (resource === 'commandes') {
			json = await orderApi.createOrder(params.data);
		} else if (resource === 'produits') {
			const payload = buildProductCreatePayload(params.data);
			json = await apiService.post('produits', payload);
		} else {
			json = await apiService.post(resource, params.data);
		}
		return { data: { id: getId(json), ...json } };
	},

	// UPDATE
	update: async (resource, params) => {
		let json;
		if (resource === 'categories') {
			json = await categoryApi.updateCategory(params.id, params.data);
		} else if (resource === 'commandes') {
			json = await orderApi.updateOrder(params.id, params.data);
		} else if (resource === 'produits') {
			const payload = buildProductUpdatePayload(params.data);
			json = await apiService.patch(`produits/${params.id}`, payload);
		} else {
			json = await apiService.patch(`${resource}/${params.id}`, params.data);
		}
		return { data: { id: getId(json), ...json } };
	},

	// DELETE
	delete: async (resource, params) => {
		if (resource === 'categories') {
			await categoryApi.deleteCategory(params.id);
		} else if (resource === 'commandes') {
			await orderApi.deleteOrder(params.id);
		} else if (resource === 'produits') {
			await apiService.delete(`produits/${params.id}`);
		} else {
			await apiService.delete(`${resource}/${params.id}`);
		}
		return { data: { id: params.id } };
	},

	// hooks obligatoires
	getMany: async (resource, params) => {
		const res = await Promise.all(
			params.ids.map((id) => apiService.get(`${resource}/${id}`))
		);
		return {
			data: res.map((json) => ({ id: getId(json), ...json })),
		};
	},
	getManyReference: async () => ({ data: [], total: 0 }),
	updateMany: async (resource, params) => {
		// si un jour tu l'utilises, même principe que deleteMany
		const res = await Promise.all(
			params.ids.map((id) => {
				if (resource === 'categories') {
					return categoryApi.updateCategory(id, params.data);
				} else if (resource === 'commandes') {
					return orderApi.updateOrder(id, params.data);
				} else if (resource === 'produits') {
					const payload = buildProductUpdatePayload(params.data);
					return apiService.patch(`produits/${id}`, payload);
				} else {
					return apiService.patch(`${resource}/${id}`, params.data);
				}
			})
		);

		return {
			data: res.map((json) => getId(json)),
		};
	},
	deleteMany: async (resource, params) => {
		await Promise.all(
			params.ids.map((id) => {
				if (resource === 'categories') {
					return categoryApi.deleteCategory(id);
				} else if (resource === 'commandes') {
					return orderApi.deleteOrder(id);
				} else if (resource === 'produits') {
					return apiService.delete(`produits/${id}`);
				} else {
					return apiService.delete(`${resource}/${id}`);
				}
			})
		);

		// React-Admin attend la liste des id supprimés
		return { data: params.ids };
	},
};

const FormToolbar = () => {
	const redirect = useRedirect();
	const resource = useResourceContext();
	const record = useRecordContext();

	const backLabels = {
		categories: 'Retour aux catégories',
		produits: 'Retour aux produits',
		commandes: 'Retour aux commandes',
	};

	const backLabel = backLabels[resource] || 'Retour à la liste';

	// Texte personnalisé pour le bouton supprimer
	const deleteLabels = {
		categories: 'Supprimer cette catégorie',
		produits: 'Supprimer ce produit',
		commandes: 'Supprimer cette commande',
	};
	const deleteLabel = deleteLabels[resource] || 'Supprimer';

	return (
		<Toolbar>
			<SaveButton />

			<Button
				type="button"
				onClick={() => redirect('list', resource)}
				startIcon={<ArrowBackIcon />}
				sx={{ ml: 2 }}
			>
				{backLabel}
			</Button>

			{record && (
				<DeleteButton
					label={deleteLabel}
					mutationMode="pessimistic"
					redirect="list"
					sx={{ ml: 2 }}
				/>
			)}

		</Toolbar>
	);
};

const DefaultListActions = (props) => (
	<TopToolbar {...props}>
		<CreateButton label="CRÉER" />
		<ExportButton label="EXPORTER" />
	</TopToolbar>
);

const DefaultBulkActions = () => (
	<>
		<BulkDeleteWithConfirmButton
			label="Supprimer"
			confirmTitle="Supprimer les éléments sélectionnés ?"
			confirmContent="Cette action est définitive. Confirmez-vous la suppression de tous les éléments sélectionnés ?"
			mutationMode="pessimistic"
		/>
	</>
);



// UI RA

// CATEGORIES
const CategoryList = () => (
	<List
		actions={<DefaultListActions />}
		bulkActionButtons={<DefaultBulkActions />}
	>
		<Datagrid>
			<TextField source="id" />
			<TextField source="nom" />
			<EditButton label="ÉDITER" />
		</Datagrid>
	</List>
);

const CategoryEdit = () => (
	<Edit>
		<SimpleForm toolbar={<FormToolbar />}>
			<TextInput source="nom" />
		</SimpleForm>
	</Edit>
);

const CategoryCreate = () => (
	<Create redirect="list">
		<SimpleForm toolbar={<FormToolbar />}>
			<TextInput source="nom" required />
		</SimpleForm>
	</Create>
);

// PRODUITS
const ProductList = () => (
	<List
		actions={<DefaultListActions />}
		bulkActionButtons={<DefaultBulkActions />}
	>
		<Datagrid>
			<TextField source="id" label="ID" />
			<TextField source="nom" label="Nom" />
			<TextField source="reference" label="Référence" />
			<TextField source="prix_ht" label="Prix HT" />
			<TextField source="prix_ttc" label="Prix TTC" />
			<TextField source="stock" label="Stock" />
			<EditButton label="ÉDITER" />
		</Datagrid>
	</List>
);

const ProductEdit = () => (
	<Edit>
		<SimpleForm toolbar={<FormToolbar />}>
			<TextInput source="nom" label="Nom" />
			<TextInput source="reference" label="Référence" />
			<TextInput source="description" label="Description" />
			<NumberInput source="prix_ht" label="Prix HT" />
			<NumberInput source="prix_ttc" label="Prix TTC" disabled />
			<NumberInput source="stock" label="Stock" />
		</SimpleForm>
	</Edit>
);

const ProductCreate = () => (
	<Create redirect="list">
		<SimpleForm toolbar={<FormToolbar />}>
			<TextInput source="nom" label="Nom" />
			<TextInput source="reference" label="Référence" />
			<TextInput source="description" label="Description" />
			<NumberInput source="prix_ht" label="Prix HT" />
			<NumberInput source="prix_ttc" label="Prix TTC" />
			<NumberInput source="stock" label="Stock" />
		</SimpleForm>
	</Create>
);

// COMMANDES
const OrderList = () => (
	<List
		actions={<DefaultListActions />}
		bulkActionButtons={<DefaultBulkActions />}
	>
		<Datagrid>
			{/* id_commande vient directement de l'API */}
			<TextField source="id_commande" label="Id commande" />

			{/* Id utilisateur (depuis l'objet utilisateur) */}
			<TextField
				source="utilisateur.id_utilisateur"
				label="Id utilisateur"
			/>

			{/* Nom complet du client */}
			<FunctionField
				label="Client"
				render={(record) =>
					record.utilisateur
						? `${record.utilisateur.prenom} ${record.utilisateur.nom}`
						: ''
				}
			/>

			{/* Total TTC de la commande */}
			<TextField
				source="prix_total_commande"
				label="Total commande"
			/>

			{/* Libellé de l'état de commande */}
			<TextField
				source="etat_commande.libelle"
				label="État"
			/>

			{/* Date de commande avec heure */}
			<DateField
				source="date_commande"
				label="Date"
				showTime
			/>
		</Datagrid>
	</List>
);

const TrackingField = (props) => {
	const record = useRecordContext(props);
	if (!record || !record.numero_suivi) {
		return null; // rien du tout si pas de numéro
	}

	return (
		<TextField
			source="numero_suivi"
			label="Numéro de suivi"
		/>
	);
};

const OrderProductCard = () => {
	const record = useRecordContext();
	if (!record) return null;

	return (
		<Card sx={{ mb: 2 }}>
			<CardContent sx={{ pb: 1 }}>
				<Typography variant="subtitle2" color="text.secondary">
					Réf. : {record.produit?.reference ?? ''}
				</Typography>

				<Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
					{record.produit?.nom ?? ''}
				</Typography>

				<Typography variant="body2">
					Qté : {record.quantite}
				</Typography>

				<Typography variant="body2">
					Prix unitaire TTC : {record.produit?.prix_ttc ?? ''} €
				</Typography>

				<Typography variant="body2" sx={{ fontWeight: 'bold', mt: 0.5 }}>
					Total produit : {record.prix_total_produit} €
				</Typography>
			</CardContent>
		</Card>
	);
};

const OrderProducts = () => {
	const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

	return (
		<ArrayField source="commandeProduits" label="Produits">
			Produits de la commande :
			{isSmall ? (
				/* 📱 Vue mobile : liste simple */
				<SingleFieldList>
					<OrderProductCard />
				</SingleFieldList>
			) : (
				/* 💻 Vue desktop : tableau comme avant */
				<Datagrid bulkActionButtons={false}>
					<TextField source="produit.reference" label="Réf." />
					<TextField source="produit.nom" label="Produit" />
					<TextField source="quantite" label="Qté" />
					<TextField source="produit.prix_ttc" label="Prix unitaire" />
					<TextField
						source="prix_total_produit"
						label="Total produit"
					/>
				</Datagrid>
			)}
		</ArrayField>
	);
};

const OrderShow = () => (
	<Show>
		<SimpleShowLayout>
			{/* Infos générales */}
			<TextField source="id_commande" label="Id commande" />
			<TextField source="reference" label="Référence" />
			<DateField source="date_commande" label="Date de commande" showTime />

			{/* Client */}
			<TextField source="utilisateur.id_utilisateur" label="Id utilisateur" />
			<FunctionField
				label="Client"
				render={(record) =>
					record.utilisateur
						? `${record.utilisateur.prenom} ${record.utilisateur.nom}`
						: ''
				}
			/>

			{/* Montants */}
			<TextField
				source="total_produits_commande"
				label="Total produits"
			/>
			<TextField
				source="frais_livraison"
				label="Frais de livraison"
			/>
			<TextField
				source="prix_total_commande"
				label="Total commande TTC"
			/>

			{/* État / livraison */}
			<TextField
				source="etat_commande.libelle"
				label="État de la commande"
			/>
			<TextField
				source="methodeLivraison.nom"
				label="Méthode de livraison"
			/>
			<TextField
				source="transporteur.nom"
				label="Transporteur"
			/>
			<TrackingField />
			<TextField
				source="reference"
				label="Référence"
			/>

			{/* Adresse de facturation */}
			<FunctionField
				label="Adresse de facturation"
				render={(record) =>
					record.adresseFacturation
						? `${record.adresseFacturation.prenom} ${record.adresseFacturation.nom}
${record.adresseFacturation.rue}
${record.adresseFacturation.code_postal} ${record.adresseFacturation.ville}`
						: ''
				}
			/>

			{/* Adresse de livraison */}
			<FunctionField
				label="Adresse de livraison"
				render={(record) =>
					record.adresseLivraison
						? `${record.adresseLivraison.prenom} ${record.adresseLivraison.nom}
${record.adresseLivraison.rue}
${record.adresseLivraison.code_postal} ${record.adresseLivraison.ville}`
						: ''
				}
			/>

			{/* Produits de la commande */}
			<OrderProducts />
		</SimpleShowLayout>
	</Show>
);


// Layout personnalisé avec bouton "Retour au site"
const MyAppBar = () => {
	const navigate = useNavigate();

	return (
		<AppBar>
			<TitlePortal />
			<span style={{ flex: 1 }} />
			<Button color="inherit" onClick={() => navigate('/')}>
				Retour au site
			</Button>
		</AppBar>
	);
};

// Layout personnalisé qui utilise AppBar
const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} />;

// ADMIN
export default function AdminApp() {
	return (
		<Admin dataProvider={dataProvider} layout={MyLayout} i18nProvider={i18nProvider}>
			<Resource
				name="categories"
				list={CategoryList}
				edit={CategoryEdit}
				icon={BsTag}
				create={CategoryCreate}
			/>
			<Resource
				name="produits"
				list={ProductList}
				edit={ProductEdit}
				icon={BsBoxSeam}
				create={ProductCreate}
			/>
			<Resource
				name="commandes"
				list={OrderList}
				show={OrderShow}
				icon={BsReceipt}
			/>
		</Admin>
	);
}
