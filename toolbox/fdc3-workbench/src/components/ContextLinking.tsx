import React, { useState } from "react";
import { observer } from "mobx-react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography, Grid, Button, IconButton, Tooltip } from "@material-ui/core";
import { codeExamples } from "../fixtures/codeExamples";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import contextStore from "../store/ContextStore";
import { TemplateTextField } from "./common/TemplateTextField";
import { copyToClipboard } from "./common/CopyToClipboard";

// interface copied from lib @material-ui/lab/Autocomplete
interface FilterOptionsState<T> {
	inputValue: string;
	getOptionLabel: (option: T) => string;
}

interface ListenerOptionType {
	title: string;
	value: string;
}

type ListenerSetValue = (value: ListenerOptionType | null) => void;

type ListenerSetError = (error: string | false) => void;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		form: {
			display: "flex",
			flexWrap: "wrap",
			marginTop: theme.spacing(1),
			"& > *": {
				margin: theme.spacing(1),
				marginRight: 0,
			},
		},
		controls: {
			"& .MuiIconButton-sizeSmall": {
				padding: "6px",
				marginLeft: theme.spacing(1),
			},
		},
		spread: {
			flexDirection: "row",
			justifyContent: "flex-end",
		},
		contextListenerName: {
			flexGrow: 1,
			marginRight: theme.spacing(1),
			minWidth: "190px",
		},
		rightAlign: {
			flexDirection: "row",
			justifyContent: "flex-end",
		},
	})
);

const listenerFilter = createFilterOptions<ListenerOptionType>();

export const ContextLinking = observer(() => {
	const classes = useStyles();
	const [contextListener, setContextListener] = useState<ListenerOptionType | null>(null);
	const [contextError, setContextError] = useState<string | false>(false);
	const contextListenersOptions: ListenerOptionType[] = contextStore.contextsList.map(({ id }) => {
		return {
			title: id,
			value: id,
		};
	});
	contextListenersOptions.unshift({
		title: "All",
		value: "all",
	});

	const handleChangeListener =
		(setValue: ListenerSetValue, setError: ListenerSetError) => (event: React.ChangeEvent<{}>, newValue: any) => {
			if (typeof newValue === "string") {
				setValue({
					title: newValue,
					value: newValue,
				});
			} else if (newValue && newValue.inputValue) {
				setValue({
					title: newValue.inputValue,
					value: newValue.inputValue,
				});
			} else {
				setValue(newValue);
			}

			setError(false);
		};

	const getOptionLabel = (option: ListenerOptionType) => {
		if (option.value) {
			return option.value;
		}
		return option.title;
	};

	const filterOptions = (options: ListenerOptionType[], params: FilterOptionsState<ListenerOptionType>) => {
		const filtered = listenerFilter(options, params);

		if (params.inputValue !== "") {
			filtered.push({
				value: params.inputValue,
				title: `Add "${params.inputValue}"`,
			});
		}

		return filtered;
	};

	const handleAddContextListener = () => {
		if (contextListener) {
			if (contextStore.isContextListenerExists(contextListener.value)) {
				setContextError("Listener already added");
			} else {
				contextStore.addContextListener(contextListener.value);
				setContextListener(null);
			}
		} else {
			setContextError("Enter context type");
		}
	};

	return (
		<div className={classes.root}>
			<Grid item xs={12}>
				<Typography variant="h5">Add Context Listener</Typography>
			</Grid>

			<form className={classes.form} noValidate autoComplete="off">
				<Grid
					container
					direction="row"
					spacing={1}
					justifyContent="space-between"
					className={`${classes.controls} ${classes.rightAlign}`}
				>
					<Grid item className={classes.contextListenerName}>
						<Autocomplete
							id="context-listener"
							size="small"
							selectOnFocus
							blurOnSelect
							clearOnBlur
							handleHomeEndKeys
							value={contextListener}
							onChange={handleChangeListener(setContextListener, setContextError)}
							filterOptions={filterOptions}
							options={contextListenersOptions}
							getOptionLabel={getOptionLabel}
							renderOption={(option) => option.title}
							renderInput={(params) => (
								<TemplateTextField
									label="CONTEXT LISTENER"
									placeholder="Enter Context Type"
									variant="outlined"
									{...params}
									error={!!contextError}
									helperText={contextError}
								/>
							)}
						/>
					</Grid>
					<Grid item className={classes.controls}>
						<Button variant="contained" color="primary" onClick={handleAddContextListener}>
							Add Listener
						</Button>

						<Tooltip title="Copy code example" aria-label="Copy code example">
							<IconButton
								size="small"
								aria-label="Copy code example"
								color="primary"
								onClick={copyToClipboard(codeExamples.contextListener, "addContextListener")}
							>
								<FileCopyIcon />
							</IconButton>
						</Tooltip>
					</Grid>
				</Grid>
			</form>
		</div>
	);
});
